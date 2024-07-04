/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OtpService } from './otp.service';
import transporter from 'src/helpers/transport';
import otpMessageMail from 'src/messageMail/otpMessage';
import { UpdateDto } from './dto/update.dto';
import { UsersService } from 'src/users/users.service';

@Controller('otps')
export class OtpController {
  constructor(
    private otpService: OtpService,
    private userService: UsersService,
  ) {}

  @Post('confirm/:id')
  async confirmOtp(@Body('OtpKode') OtpKode: string, @Param('id') id: string) {
    const response = await this.otpService.confirmOtp(id, OtpKode);

    await this.userService.activateUser(response);
    return {
      status: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put('update/:id')
  async updateOtp(@Body() payload: UpdateDto, @Param('id') id: string) {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const time = new Date().getTime() + 300000;

    const otp_code = otp.toString();
    const expired_time = new Date(time);

    const otpResponse = await this.otpService.updateOtp(
      {
        Otp_code: otp_code,
        Expired_time: expired_time,
      },
      id,
    );

    const message = {
      from: process.env.EMAIL,
      to: payload.Email,
      subject: 'Verifcation OTP',
      html: otpMessageMail({ otp_code }),
    };

    await transporter.sendMail(message);

    return {
      status: 'OK',
      message: 'Email sent',
      respose: { id_otp: otpResponse.Id, kode: otpResponse.Otp_code },
    };
  }
  catch(error) {
    return {
      status: 'FAIL',
      message: error.message,
    };
  }
}
