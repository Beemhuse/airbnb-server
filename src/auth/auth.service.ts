import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Helper method to filter sensitive user data
  filterUserData(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, otp, otpExpires, __v, ...filteredUser } = user;
    return filteredUser as any;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // Strict validation
    if (!email || typeof email !== 'string') {
      this.logger.warn(`Login attempt with invalid email: ${email}`);
      throw new BadRequestException(
        'Email is required and must be a valid string',
      );
    }

    if (!pass || typeof pass !== 'string') {
      this.logger.warn(
        `Login attempt with invalid password format for email: ${email}`,
      );
      throw new BadRequestException(
        'Password is required and must be a valid string',
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await this.usersService.findOneByEmail(trimmedEmail);
    if (!user) {
      this.logger.warn(`Login attempt for non-existent user: ${trimmedEmail}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.password) {
      this.logger.warn(
        `Login attempt for user without password: ${trimmedEmail}`,
      );
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Failed login attempt for user: ${trimmedEmail}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`Successful login for user: ${trimmedEmail}`);
    return this.filterUserData(user.toObject());
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: this.filterUserData(user),
    };
  }

  async register(userData: any) {
    const existing = await this.usersService.findOneByEmail(userData.email);
    if (existing) {
      throw new UnauthorizedException('User already exists');
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await this.usersService.create(userData);
    return this.login(this.filterUserData(user.toObject()));
  }

  async sendOtp(email: string) {
    let user = await this.usersService.findOneByEmail(email);
    if (!user) {
      user = await this.usersService.create({ email });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.usersService.updateOnboarding(email, { otp, otpExpires });

    const sent = await this.mailService.sendOtp(email, otp);
    if (!sent) {
      throw new BadRequestException('Failed to send OTP email');
    }

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (
      !user ||
      user.otp !== otp ||
      new Date() > (user.otpExpires || new Date(0))
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Clear OTP after verification
    await this.usersService.updateOnboarding(email, {
      otp: null,
      otpExpires: null,
    });

    return this.login(this.filterUserData(user.toObject()));
  }

  async uploadAvatar(email: string, file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadImage(file);
    if (!result || 'error' in result) {
      throw new BadRequestException('Failed to upload image to Cloudinary');
    }

    const updatedUser = await this.usersService.updateAvatar(
      email,
      result.secure_url,
    );
    return {
      url: result.secure_url,
      user: updatedUser ? this.filterUserData(updatedUser.toObject()) : null,
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.filterUserData(user.toObject());
  }
}
