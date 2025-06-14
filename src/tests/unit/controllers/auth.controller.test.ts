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

  describe('POST /login', () => {
    let testUser: any;

    beforeAll(async () => {
      testUser = createTestUser();

      const signupRes = await request(app).post(signupEndpoint).send(testUser);
      console.log('Registered for login test:', signupRes.body);
    });

    it('should login with correct credentials', async () => {
      const res = await request(app).post(loginEndpoint).send({
        emailOrPhone: testUser.email,
        password: testUser.password,
      });

      console.log('Login Response:', res.body);

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