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
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/helpers/auth.guard';
import { IsActiveGuard } from 'src/helpers/isactive.guard';
import { TokosService } from './tokos.service';
import { CreateTokoDto } from './dtto/create.toko.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { tokosUploadOption } from 'src/helpers/storage';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { OnlyAdminGuard } from 'src/helpers/onlyadmin.guard';
import { UpdateTokoDto } from './dtto/update.dto';

interface tokoRequest extends Request {
  user: {
    id: string;
  };
}

@UseGuards(AuthGuard, IsActiveGuard)
@Controller('tokos')
export class TokosController {
  constructor(
    private tokoService: TokosService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('Photo', tokosUploadOption))
  @HttpCode(HttpStatus.CREATED)
  async createToko(
    @Body() payload: CreateTokoDto,
    @Req() req: tokoRequest,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    Photo: Express.Multer.File,
  ) {
    const { id } = req.user;
    const image = await this.cloudinaryService.uploadFile(Photo.path);
    payload.Photo = image.url;
    const response = await this.tokoService.create({ ...payload, User_id: id });
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @UseGuards(OnlyAdminGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTokos() {
    const response = await this.tokoService.findAll();
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getDetailToko(@Param('Id') Id: string) {
    const toko = await this.tokoService.findById(Id);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: toko,
    };
  }

  @Get('/tokouser')
  @HttpCode(HttpStatus.OK)
  async getDetailTokoByUser(@Req() req: tokoRequest) {
    const { id } = req.user;
    const response = await this.tokoService.findTokoByUser(id);
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('Photo', tokosUploadOption))
  @HttpCode(HttpStatus.OK)
  async updateToko(
    @Body() payload: UpdateTokoDto,
    @Req() req: tokoRequest,
    @Param('id')
    Id: string,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: false,
      }),
    )
    Photo: Express.Multer.File,
  ) {
    const image = await this.cloudinaryService.uploadFile(Photo.path);
    const { id } = req.user;
    payload.Photo = image.url;
    const response = await this.tokoService.updateToko(
      { ...payload, User_id: id },
      Id,
    );
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: response,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteToko(@Param('id') id: string) {
    const response = await this.tokoService.deleteToko(id);
    return {
      status: HttpStatus.OK,
      message: response,
    };
  }
}
