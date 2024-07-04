/*
https://docs.nestjs.com/guards#guards
*/

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const authHeader = request.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    const user = jwt.verify(
      token,
      process.env.TOKEN,
      (error: Error, payload: any) => {
        if (error) {
          throw new UnauthorizedException();
        }
        return payload;
      },
    );
    request.user = user;
    return true;
  }
}
