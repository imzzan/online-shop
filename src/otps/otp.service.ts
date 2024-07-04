/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { OtpDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class OtpService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: OtpDto) {
    return this.prismaService.oTP.create({
      data: payload,
    });
  }

  async updateOtp(payload: UpdateDto, Id: string) {
    const otpUser = await this.prismaService.oTP.update({
      data: payload,
      where: { Id: Id },
      select: {
        Id: true,
        User_id: true,
        Expired_time: true,
        Otp_code: true,
      },
    });

    return otpUser;
  }

  async confirmOtp(Id: string, otpKode: string) {
    const kodeOtp = await this.prismaService.oTP.findFirst({
      where: { Id: Id },
    });

    if (kodeOtp.Otp_code !== otpKode) {
      throw new HttpException('Kode Tidak Sesuai', HttpStatus.BAD_REQUEST);
    }

    return kodeOtp.User_id;
  }
}
