/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

interface userRequestt extends Request {
  user: {
    id: string;
  };
}

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: userRequestt = context.switchToHttp().getRequest();
    const { id } = request.user;
    const user = await this.userService.getProfile(id);

    if (user.Role !== 'ADMIN') {
      return false;
    }

    return true;
  }
}
