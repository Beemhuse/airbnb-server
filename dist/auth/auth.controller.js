"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const users_service_1 = require("../users/users.service");
let AuthController = AuthController_1 = class AuthController {
    authService;
    usersService;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(body) {
        if (!body || typeof body !== 'object') {
            this.logger.warn('Login attempt with invalid request body');
            throw new common_1.BadRequestException('Invalid request body');
        }
        if (!body.email ||
            typeof body.email !== 'string' ||
            body.email.trim().length === 0) {
            this.logger.warn('Login attempt with missing or invalid email');
            throw new common_1.BadRequestException('Email is required and must be a non-empty string');
        }
        if (!body.password ||
            typeof body.password !== 'string' ||
            body.password.length === 0) {
            this.logger.warn('Login attempt with missing or invalid password');
            throw new common_1.BadRequestException('Password is required and must be a non-empty string');
        }
        const user = await this.authService.validateUser(body.email.trim(), body.password);
        return this.authService.login(user);
    }
    async register(body) {
        return this.authService.register(body);
    }
    async getProfile(req) {
        return this.authService.getProfile(req.user.userId);
    }
    async onboard(body) {
        const { email, ...onboardingData } = body;
        const updatedUser = await this.usersService.updateOnboarding(email, onboardingData);
        return updatedUser
            ? this.authService['filterUserData'](updatedUser.toObject())
            : null;
    }
    async sendOtp(body) {
        return this.authService.sendOtp(body.email);
    }
    async verifyOtp(body) {
        return this.authService.verifyOtp(body.email, body.otp);
    }
    async uploadAvatar(email, file) {
        return this.authService.uploadAvatar(email, file);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('onboard'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "onboard", null);
__decorate([
    (0, common_1.Post)('send-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('upload-avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadAvatar", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map