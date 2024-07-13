/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { OtpService } from 'src/otps/otp.service';
import otpMessageMail from 'src/messageMail/otpMessage';
import transporter from 'src/helpers/transport';
import { FileInterceptor } from '@nestjs/platform-express';
import { userUploadOption } from 'src/helpers/storage';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Request } from 'express';
import { AuthGuard } from 'src/helpers/auth.guard';
import { IsActiveGuard } from 'src/helpers/isactive.guard';
import { OnlyAdminGuard } from 'src/helpers/onlyadmin.guard';
import { UpdateUserDto } from './dto/update.user';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private otpService: OtpService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('/sign-up')
  @UseInterceptors(FileInterceptor('Photo', userUploadOption))
  async signUp(
    @Body() paylaod: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    Photo: Express.Multer.File,
  ) {
    try {
      const image = await this.cloudinaryService.uploadFile(Photo.path);
      paylaod.Photo = image.url;

      const response = await this.userService.create({
        ...paylaod,
        Age: Number(paylaod.Age),
      });

      const otp = Math.floor(Math.random() * 900000) + 100000;
      const time = new Date().getTime();

      const otp_code = otp.toString();
      const expired_time = new Date(time + 3 * 60 * 1000);
      const { Id } = response;

      const otpResponse = await this.otpService.create({
        Otp_code: otp_code,
        User_id: Id,
        Expired_time: expired_time,
      });

      const message = {
        from: process.env.EMAIL,
        to: paylaod.Email,
        subject: 'Verifcation OTP',
        html: otpMessageMail({ otp_code }),
      };

      await transporter.sendMail(message);

      return {
        status: 'OK',
        message: 'Email sent',
        respose: { id_otp: otpResponse.Id, email: response.Email },
      };
    } catch (error) {
      return {
        status: 'FAIL',
        message: error.message,
      };
    }
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() payload: LoginDto) {
    const response = await this.userService.login(payload);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      token: response,
    };
  }

  @UseGuards(AuthGuard, IsActiveGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Req() req: UserRequest) {
    const { id } = req.user;

    const response = await this.userService.getProfile(id);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @UseGuards(AuthGuard, IsActiveGuard)
  @UseInterceptors(FileInterceptor('Photo', userUploadOption))
  @Put('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Body() payload: UpdateUserDto,
    @Req() req: UserRequest,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    Photo: Express.Multer.File,
  ) {
    const { id } = req.user;
    const image = await this.cloudinaryService.uploadFile(Photo.path);
    payload.Photo = image.url;
    const response = await this.userService.updateProfile(
      { ...payload, Age: Number(payload.Age) },
      id,
    );
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @UseGuards(AuthGuard, IsActiveGuard, OnlyAdminGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const response = await this.userService.getAllUsers();
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @UseGuards(AuthGuard, IsActiveGuard, OnlyAdminGuard)
  @Delete('profile/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);
    return {
      status: HttpStatus.OK,
      message: response,
    };
  }
}
