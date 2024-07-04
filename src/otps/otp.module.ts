import { UsersService } from 'src/users/users.service';
import { OtpController } from './otp.controller';

import { OtpService } from './otp.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [OtpController],
  providers: [OtpService, UsersService],
  exports: [OtpService],
})
export class OtpModule {}
