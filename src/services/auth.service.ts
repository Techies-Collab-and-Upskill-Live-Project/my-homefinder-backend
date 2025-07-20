import {StatusCodes} from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import {isEmpty} from "../utils/isEmpty.util";
import {prisma} from "../prisma/prisma";
import {comparePassword, hashPassword} from "../utils/hash.util";
import {
    loginDataType,
    signUpDataType,
    TokenDataType,
} from "../interfaces/auth.interface";
import {generateToken} from "../utils/jwt.util";
import { OTPGenerator } from "../utils/otp-generator.util";
import { config } from "../config";
import { EmailService } from "../services/email.service";

export class AuthService {

    public signup = async (userData: signUpDataType) => {
        if (isEmpty(userData)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty user data");
        }

        const {fullName, email, phone, password, role, passwordRepeat} = userData;
        const allowedRoles = ["renter", "landlord"];
        if (!role || !allowedRoles.includes(role.toLowerCase())) {
            throw new HTTPException(
                StatusCodes.BAD_REQUEST,
                "Invalid or missing role. Role must be renter or landlord"
            );
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{email}, {phone}],
            },
        });

        if (existingUser) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Email already registered");
        }

        if (password !== passwordRepeat) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Passwords don't match");
        }

        let userRole = await prisma.role.findUnique({
            where: {name: role.toUpperCase()},
        });

        if (!userRole) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Role not found");
        }

        const hashedPassword = await hashPassword(password);


        // Create user without OTP fields
        const newUser = await prisma.user.create({
            data: {
                fullName,
                email,
                phone,
                password: hashedPassword,
                isVerified: false,
                role: {
                    connect: {id: userRole.id},
                },
            },
            include: {
                role: true,
                tenantProfile: role.toUpperCase() === "TENANT",
                landlordProfile: role.toUpperCase() === "LANDLORD",
            }
        });

        // Invalidate any existing unused tokens for this user
        await prisma.emailVerificationToken.updateMany({
            where: {
                userId: newUser.id,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
            data: {
                used: true,
            },
        });

        // Generate OTP and expiry
        const otp = OTPGenerator.generateNumeric(6);
        const expiresAt = OTPGenerator.generateExpiryDate(config.otp.expiryMinutes);
        const hashedOTP = await hashPassword(otp);

        // Store the token in database
        await prisma.emailVerificationToken.create({
            data: {
                token: hashedOTP,
                userId: newUser.id,
                expiresAt,
                used: false,
            },
        });

        // Send verification email
        const emailService = new EmailService();
        await emailService.sendVerificationEmail(email, otp);

        // create profile for user
        if (role.toUpperCase() === "TENANT") {
            await prisma.tenantProfile.create({
                data: {
                    profileImage: "",
                    fullName: fullName,
                    firstName: "",
                    lastName: "",
                    otherName: "",
                    phoneNumber: phone,
                    street: "",
                    city: "",
                    state: "",
                    NIN: "",
                    userId: newUser.id
                }
            })
        }
        if (role.toUpperCase() === "LANDLORD") {
            await prisma.landLordProfile.create({
                data: {
                    profileImage: "",
                    fullName: fullName,
                    firstName: "",
                    lastName: "",
                    otherName: "",
                    otherInfo: "",
                    address: "",
                    preference: "CALLS",
                    NIN: "",
                    driversLicense: "",
                    BVN: "",
                    userId: newUser.id
                }
            })
        }

        return newUser;
    };

    public login = async (
        loginData: loginDataType
    ): Promise<{ user: any; token: TokenDataType; cookie: string }> => {
        if (isEmpty(loginData)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty login data");
        }

        const {emailOrPhone, password} = loginData;

        const user = await prisma.user.findFirst({
            where: {
                OR: [{email: emailOrPhone}, {phone: emailOrPhone}],
            },
            include: {role: true},
        });

        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
        }

        if (!user.isVerified) {
            throw new HTTPException(StatusCodes.UNAUTHORIZED, "Please verify your email before logging in.");
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new HTTPException(StatusCodes.UNAUTHORIZED, "Invalid credentials");
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role.name,
        });

        const cookie = this.createCookie(token);
        return {user, cookie, token};
    };

    // Verify OTP and mark user as verified (using EmailVerificationToken)
    public verifyEmail = async (email: string, otp: string) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
        }
        if (user.isVerified) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "User already verified");
        }
        // Find all valid tokens that haven't expired or been used
        const validTokens = await prisma.emailVerificationToken.findMany({
            where: {
                userId: user.id,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        // Find the matching token by comparing hashes
        let matchingTokenRecord = null;
        for (const tokenRecord of validTokens) {
            const isMatch = await comparePassword(otp, tokenRecord.token);
            if (isMatch) {
                matchingTokenRecord = tokenRecord;
                break;
            }
        }

        if (!matchingTokenRecord) {
            throw new HTTPException(StatusCodes.UNAUTHORIZED, "Invalid or expired verification code");
        }

        // Mark user as verified and token as used
        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: {
                    isVerified: true,
                },
            }),
            prisma.emailVerificationToken.update({
                where: { id: matchingTokenRecord.id },
                data: { used: true },
            }),
        ]);

        return { message: "Email verified successfully" };
    };

    public logout = async (userId: string) => {
        if (isEmpty(userId)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Empty user Id");
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
        }

        return user;
    };

    private createCookie(tokenData: TokenDataType): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}