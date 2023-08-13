import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../repository/impl/user.repository';
import { Model } from 'mongoose';
import { User } from '../entities/user.model';
import { CreateUserDto } from '../repository/dto/createuser.dto';
import { UpdateUserDto } from '../repository/dto/updateuser.dto';
import { randomBytes } from 'crypto';
import { ForgotPasswordDto } from '../repository/dto/forgotPassword.dto';
import { MailerService } from '../../mail/service/mailer.service';
import * as otpGenerator from 'otp-generator';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  private otpStore: Record<string, { otp: string; timestamp: number }> = {};
  constructor(
    private userRepository: UserRepository,
    private readonly emailService: MailerService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    return this.userRepository.createUser(createUserDto);
  }

  async findUsers(page: number, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    return this.userRepository.findUsers(skip, limit);
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedCount = await this.userRepository.deleteUser(id);
    // if (deletedCount === 0) {
    //   throw new NotFoundException('User not found');
    // }
  }
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;
    // const resetToken = generateResetToken(email); // Your logic to generate a reset token

    // await this.userRepository.updateResetToken(email, resetToken);
    // await this.sendPasswordResetNotification(email, resetToken); // Implement your notification logic
  }
  // function generateResetToken(email: string): string {
  //   const tokenData = email + Date.now(); // Concatenate email and timestamp
  //   const token = randomBytes(32).toString('hex'); // Generate a random token
  //   // Combine the token and tokenData to create a unique reset token
  //   const resetToken = `${token}-${tokenData}`;
  //   return resetToken;
  // }

  async otpForPasswordReset(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    this.otpStore[email] = { otp, timestamp: Date.now() };
    await this.emailService.sendPasswordResetEmail(email, otp);
  }

  async passwordReset(email: string, otp: string, newPassword: string) {
    try {
      const storedOtp = this.otpStore[email];
      if (
        storedOtp &&
        storedOtp.otp === otp &&
        Date.now() - storedOtp.timestamp <= 600000
      ) {
        await this.userRepository.updatePassword(email, newPassword);
        delete this.otpStore[email];
      } else {
        throw new HttpException(
          'Invalid OTP or OTP has expired.',
          HttpStatus.OK,
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
