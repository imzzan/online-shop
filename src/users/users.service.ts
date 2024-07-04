/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // Sign-up users
  async create(payload: CreateUserDto) {
    const isUserExist = await this.prismaService.user.findFirst({
      where: {
        Email: payload.Email,
      },
    });

    if (isUserExist) {
      throw new HttpException('Email already uses', HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(payload.Password, salt);

    const hasil = await this.prismaService.user.create({
      data: { ...payload, Role: 'COMMON', Password: hashingPassword },
    });

    return hasil;
  }

  // Login
  async login(payload: LoginDto) {
    const isUserExist = await this.prismaService.user.findFirst({
      where: {
        OR: [{ Phone: payload.Phone }, { Email: payload.Email }],
      },
    });

    if (!isUserExist) {
      throw new HttpException('Email/Phone not found', HttpStatus.BAD_REQUEST);
    }

    const isCorrectPassword = await bcrypt.compare(
      payload.Password,
      isUserExist.Password,
    );

    if (!isCorrectPassword) {
      throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign(
      { id: isUserExist.Id, email: isUserExist.Email },
      process.env.TOKEN,
      {
        expiresIn: '1h',
      },
    );
    return token;
  }

  async activateUser(Id: string) {
    await this.prismaService.user.update({
      data: { Is_Active: true },
      where: { Id },
    });
  }

  async getProfile(Id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { Id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getAllUsers() {
    const user = await this.prismaService.user.findMany({
      where: {
        AND: [{ Is_Active: true }, { Role: 'COMMON' }],
      },
    });

    return user;
  }

  async updateProfile(payload: UpdateUserDto, Id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { Id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const newUser = await this.prismaService.user.update({
      data: payload,
      where: { Id },
    });

    return newUser;
  }

  async deleteUser(Id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { Id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.prismaService.user.delete({
      where: { Id },
    });

    return 'User Succss deleted';
  }
}
