/*
https://docs.nestjs.com/providers#services
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateTokoDto } from './dtto/create.toko.dto';
import { UpdateTokoDto } from './dtto/update.dto';

@Injectable()
export class TokosService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateTokoDto) {
    const toko = await this.prismaService.toko.create({
      data: payload,
    });

    return toko;
  }

  async findAll() {
    const tokos = await this.prismaService.toko.findMany();
    return tokos;
  }

  async findById(Id: string) {
    const toko = await this.prismaService.toko.findFirst({
      where: { Id },
      include: {
        User: {
          select: {
            Name: true,
            Email: true,
            Phone: true,
            Photo: true,
            Is_Active: true,
            Age: true,
            Alamat: true,
          },
        },
      },
    });
    return toko;
  }

  async findTokoByUser(UserId: string) {
    const toko = await this.prismaService.toko.findFirst({
      where: { User_id: UserId },
      include: {
        User: {
          select: {
            Name: true,
            Email: true,
            Phone: true,
            Photo: true,
            Is_Active: true,
            Age: true,
            Alamat: true,
          },
        },
      },
    });

    return toko;
  }

  async updateToko(payload: UpdateTokoDto, Id: string) {
    const toko = await this.prismaService.toko.findFirst({
      where: { Id },
    });

    if (!toko) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const newToko = await this.prismaService.toko.update({
      where: { Id },
      data: payload,
    });

    return newToko;
  }

  async deleteToko(Id: string) {
    const toko = await this.prismaService.toko.findFirst({
      where: { Id },
    });

    if (!toko) {
      throw new NotFoundException();
    }
    await this.prismaService.toko.delete({
      where: { Id },
    });

    return 'Toko deleted';
  }
}
