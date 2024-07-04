/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProduct } from './dto/update.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async createProduct(payload: CreateProductDto) {
    const newProduct = await this.prismaService.products.create({
      data: payload,
    });

    return newProduct;
  }

  async getAllProduct(filter: string) {
    const products = await this.prismaService.products.findMany();
    const conditions = (i: any) => {
      const nameCondition = !filter || i.Name?.includes(filter);

      return nameCondition;
    };

    const hasilFilter = products.filter(conditions);
    return hasilFilter;
  }

  async getProductById(Id: string) {
    const product = await this.prismaService.products.findFirst({
      where: { Id },
    });

    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async getProductByTokoId(tokoId: string) {
    const products = await this.prismaService.products.findMany({
      where: { Toko_id: tokoId },
    });

    if (!products) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async updateProduct(payload: UpdateProduct, id: string) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return await this.prismaService.products.update({
      where: { Id: id },
      data: payload,
    });
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.products.delete({
      where: { Id: id },
    });

    return 'Success deleted';
  }
}
