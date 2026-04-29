"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    mailService;
    cloudinaryService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService, jwtService, mailService, cloudinaryService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.cloudinaryService = cloudinaryService;
    }
    filterUserData(user) {
        const { password, otp, otpExpires, __v, ...filteredUser } = user;
        return filteredUser;
    }
    async validateUser(email, pass) {
        if (!email || typeof email !== 'string') {
            this.logger.warn(`Login attempt with invalid email: ${email}`);
            throw new common_1.BadRequestException('Email is required and must be a valid string');
        }
        if (!pass || typeof pass !== 'string') {
            this.logger.warn(`Login attempt with invalid password format for email: ${email}`);
            throw new common_1.BadRequestException('Password is required and must be a valid string');
        }
        const trimmedEmail = email.trim().toLowerCase();
        const user = await this.usersService.findOneByEmail(trimmedEmail);
        if (!user) {
            this.logger.warn(`Login attempt for non-existent user: ${trimmedEmail}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!user.password) {
            this.logger.warn(`Login attempt for user without password: ${trimmedEmail}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Failed login attempt for user: ${trimmedEmail}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        this.logger.log(`Successful login for user: ${trimmedEmail}`);
        return this.filterUserData(user.toObject());
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: this.filterUserData(user),
        };
    }
    async register(userData) {
        const existing = await this.usersService.findOneByEmail(userData.email);
        if (existing) {
            throw new common_1.UnauthorizedException('User already exists');
        }
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        const user = await this.usersService.create(userData);
        return this.login(this.filterUserData(user.toObject()));
    }
    async sendOtp(email) {
        let user = await this.usersService.findOneByEmail(email);
        if (!user) {
            user = await this.usersService.create({ email });
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await this.usersService.updateOnboarding(email, { otp, otpExpires });
        const sent = await this.mailService.sendOtp(email, otp);
        if (!sent) {
            throw new common_1.BadRequestException('Failed to send OTP email');
        }
        return { message: 'OTP sent successfully' };
    }
    async verifyOtp(email, otp) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user ||
            user.otp !== otp ||
            new Date() > (user.otpExpires || new Date(0))) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        await this.usersService.updateOnboarding(email, {
            otp: null,
            otpExpires: null,
        });
        return this.login(this.filterUserData(user.toObject()));
    }
    async uploadAvatar(email, file) {
        const result = await this.cloudinaryService.uploadImage(file);
        if (!result || 'error' in result) {
            throw new common_1.BadRequestException('Failed to upload image to Cloudinary');
        }
        const updatedUser = await this.usersService.updateAvatar(email, result.secure_url);
        return {
            url: result.secure_url,
            user: updatedUser ? this.filterUserData(updatedUser.toObject()) : null,
        };
    }
    async getProfile(userId) {
        const user = await this.usersService.findById(userId);
        console.log(user);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return this.filterUserData(user.toObject());
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        cloudinary_service_1.CloudinaryService])
], AuthService);
//# sourceMappingURL=auth.service.js.map