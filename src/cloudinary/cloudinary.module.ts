import { CloudinaryService } from './cloudinary.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
