/*
https://docs.nestjs.com/middleware#middleware
*/

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from './users.service';

interface userRequest extends Request {
  user: {
    Id: string;
  };
}
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: userRequest, res: Response, next: NextFunction) {
    const { Id } = req.user;
    const user = await this.userService.getProfile(Id);

    if (user.Is_Active === false) {
      throw new HttpException('User is not active', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
