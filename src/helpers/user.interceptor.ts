/*
https://docs.nestjs.com/interceptors#interceptors
*/

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    const user = jwt.verify(
      token,
      process.env.TOKEN,
      (error: any, payload: any) => {
        if (error) {
          return false;
        }
        return payload;
      },
    );

    request.user = user;
    return next.handle().pipe(
      map((value) => {
        console.log(value);
        return value;
      }),
    );
  }
}
