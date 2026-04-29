import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email?: string; password?: string }) {
    // Strict input validation
    if (!body || typeof body !== 'object') {
      this.logger.warn('Login attempt with invalid request body');
      throw new BadRequestException('Invalid request body');
    }

    if (
      !body.email ||
      typeof body.email !== 'string' ||
      body.email.trim().length === 0
    ) {
      this.logger.warn('Login attempt with missing or invalid email');
      throw new BadRequestException(
        'Email is required and must be a non-empty string',
      );
    }

    if (
      !body.password ||
      typeof body.password !== 'string' ||
      body.password.length === 0
    ) {
      this.logger.warn('Login attempt with missing or invalid password');
      throw new BadRequestException(
        'Password is required and must be a non-empty string',
      );
    }

    // validateUser throws UnauthorizedException for invalid credentials (401)
    const user = await this.authService.validateUser(
      body.email.trim(),
      body.password,
    );
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.userId);
  }

  @Post('onboard')
  async onboard(@Body() body: any) {
    // This can be used for the multi-step onboarding
    const { email, ...onboardingData } = body;
    const updatedUser = await this.usersService.updateOnboarding(
      email,
      onboardingData,
    );
    return updatedUser
      ? this.authService['filterUserData'](updatedUser.toObject())
      : null;
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { email: string }) {
    return this.authService.sendOtp(body.email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async uploadAvatar(
    @Body('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.uploadAvatar(email, file);
  }
}
