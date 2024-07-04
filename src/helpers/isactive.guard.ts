/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

interface userRequestt extends Request {
  user: {
    id: string;
  };
}

@Injectable()
export class IsActiveGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: userRequestt = context.switchToHttp().getRequest();

    const { id } = request.user;
    const user = await this.userService.getProfile(id);
    if (user.Is_Active == false) {
      return false;
    }
    return true;
  }
}
