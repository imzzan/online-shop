/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { UpdateProduct } from './dto/update.dto';

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

  @Get(':tokoId/toko')
  @HttpCode(HttpStatus.OK)
  async getProductsByTokoId(@Param('tokoId') tokoId: string) {
    const response = await this.productService.getProductByTokoId(tokoId);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('Photo', productsUploadOption))
  async updateProduct(
    @Body() payload: UpdateProduct,
    @UploadedFile() Photo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const image = await this.cloudinaryService.uploadFile(Photo.path);
    const response = await this.productService.updateProduct(
      {
        ...payload,
        Price: Number(payload.Price),
        Rating: Number(payload.Rating),
        Discount: Number(payload.Discount),
        Available: Number(payload.Available),
        Photo: image.url,
      },
      id,
    );

    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string) {
    const response = await this.productService.deleteProduct(id);
    return {
      status: HttpStatus.OK,
      message: response,
    };
  }
}
