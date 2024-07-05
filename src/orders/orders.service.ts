/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async createOrder(payload: CreateOrderDto) {
    const response = await this.prismaService.orders.create({
      data: payload,
    });

    return response;
  }

  async getOrderById(id: string) {
    const response = await this.prismaService.orders.findFirst({
      where: { Id: id },
    });

    return response;
  }

  async getOrderByUserid(userId: string) {
    const response = await this.prismaService.orders.findMany({
      where: { User_Id: userId },
      orderBy: {
        Payment_Date: 'asc',
      },
    });
    return response;
  }

  async updateOrder(id: string) {
    const order = this.getOrderById(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.OK);
    }

    await this.prismaService.orders.update({
      where: { Id: id },
      data: {
        Status: true,
      },
    });

    return 'Success payment';
  }
}
