import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TokosModule } from './tokos/tokos.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OtpModule } from './otps/otp.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    TokosModule,
    CloudinaryModule,
    OtpModule,
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
