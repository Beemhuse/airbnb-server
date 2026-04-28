import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    private cloudinaryService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService, cloudinaryService: CloudinaryService);
    filterUserData(user: any): any;
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(userData: any): Promise<{
        access_token: string;
        user: any;
    }>;
    sendOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        access_token: string;
        user: any;
    }>;
    uploadAvatar(email: string, file: Express.Multer.File): Promise<{
        url: any;
        user: any;
    }>;
    getProfile(userId: string): Promise<any>;
}
