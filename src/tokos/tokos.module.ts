import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TokosController } from './tokos.controller';
import { TokosService } from './tokos.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CloudinaryModule, UsersModule],
  controllers: [TokosController],
  providers: [TokosService, CloudinaryService],
})
export class TokosModule {}
