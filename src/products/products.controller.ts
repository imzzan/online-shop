/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create.dto';
import { AuthGuard } from 'src/helpers/auth.guard';
import { IsActiveGuard } from 'src/helpers/isactive.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { productsUploadOption } from 'src/helpers/storage';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@UseGuards(AuthGuard, IsActiveGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private productService: ProductsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('Photo', productsUploadOption))
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() payload: CreateProductDto,
    @UploadedFile() Photo: Express.Multer.File,
  ) {
    const image = await this.cloudinaryService.uploadFile(Photo.path);
    const response = await this.productService.createProduct({
      ...payload,
      Price: Number(payload.Price),
      Rating: Number(payload.Rating),
      Discount: Number(payload.Discount),
      Available: Number(payload.Available),
      Photo: image.url,
    });
    return {
      status: HttpStatus.CREATED,
      message: 'Success',
      data: response,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query('filter') filter: string) {
    const response = await this.productService.getAllProduct(filter);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductsByToko(@Param('id') id: string) {
    const response = await this.productService.getProductById(id);
    return {
      status: HttpStatus.OK,
      message: 'Succes',
      data: response,
    };
  }
}
