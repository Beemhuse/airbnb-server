import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(body: any): Promise<{
        access_token: string;
        user: any;
    } | {
        error: string;
    }>;
    register(body: any): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): Promise<any>;
    onboard(body: any): Promise<any>;
    sendOtp(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    uploadAvatar(email: string, file: Express.Multer.File): Promise<{
        url: any;
        user: any;
    }>;
}
