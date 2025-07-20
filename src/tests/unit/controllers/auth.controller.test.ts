process.env.JWT_SECRET = 'testsecret';

import App from '../../../app';
import request from 'supertest';
import { AuthRoute } from '../../../routes/auth.routes';

const appInstance = new App([new AuthRoute()]);
const app = appInstance.getServer();

const signupEndpoint = '/api/v1/auth/signup';
const loginEndpoint = '/api/v1/auth/login';

const createTestUser = () => {
  const password = 'TestPassword123';
  return {
    fullName: 'Bruno Dev',
    email: `bruno${Date.now()}@example.com`,
    phone: `0801${Math.floor(100000 + Math.random() * 900000)}`,
    password,
    passwordRepeat: password,
    role: 'renter',
  };
};

describe('AuthController', () => {
  describe('POST /signup', () => {
    it('should signup a new user', async () => {
      const testUser = createTestUser();

      console.log('Sending user:', testUser);
      const res = await request(app).post(signupEndpoint).send(testUser);
      console.log('Signup Response:', res.body);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'User registered');
      expect(res.body.data).toHaveProperty('email', testUser.email);
    });

    it("should fail signup if passwords don't match", async () => {
      const testUser = createTestUser();
      const res = await request(app).post(signupEndpoint).send({
        ...testUser,
        passwordRepeat: 'WrongPassword123',
        email: `nomatch${Date.now()}@example.com`,
        phone: `081${Math.floor(100000 + Math.random() * 900000)}`,
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/passwords don't match/i);
    });
  });

  describe('POST /login and /verify-email', () => {
    let testUser: any;
    let otp: string;

    beforeAll(async () => {
      testUser = createTestUser();
      // Signup user
      const signupRes = await request(app).post(signupEndpoint).send(testUser);
      expect(signupRes.status).toBe(201);
      // Get OTP from database (simulate email delivery)
      // This requires direct DB access or a test helper; here we assume prisma is available
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { prisma } = require('../../../prisma/prisma');
      const user = await prisma.user.findUnique({ where: { email: testUser.email } });
      const tokenRecord = await prisma.emailVerificationToken.findFirst({
        where: { userId: user.id, used: false },
        orderBy: { createdAt: 'desc' },
      });
      // The OTP is hashed, so we can't get the plain value; instead, we generate a new one and update the record for test
      otp = '123456';
      const { hashPassword } = require('../../../utils/hash.util');
      const hashedOTP = await hashPassword(otp);
      await prisma.emailVerificationToken.update({ where: { id: tokenRecord.id }, data: { token: hashedOTP } });
    });

    it('should fail login before email verification', async () => {
      const res = await request(app).post(loginEndpoint).send({
        emailOrPhone: testUser.email,
        password: testUser.password,
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/verify your email/i);
    });

    it('should fail email verification with wrong OTP', async () => {
      const res = await request(app)
        .post('/api/v1/auth/verify-email')
        .send({ email: testUser.email, otp: '000000' });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/invalid|expired/i);
    });

    it('should verify email with correct OTP', async () => {
      const res = await request(app)
        .post('/api/v1/auth/verify-email')
        .send({ email: testUser.email, otp });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Email verified successfully');
    });

    it('should login with correct credentials after verification', async () => {
      const res = await request(app).post(loginEndpoint).send({
        emailOrPhone: testUser.email,
        password: testUser.password,
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
    });

    it('should fail login with wrong credentials', async () => {
      const res = await request(app).post(loginEndpoint).send({
        emailOrPhone: testUser.email,
        password: 'WrongPassword123',
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});