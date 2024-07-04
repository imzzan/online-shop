import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  Name: string;

  @IsEmail()
  Email: string;

  @IsPhoneNumber()
  Phone: string;

  @IsStrongPassword()
  Password: string;
  Role: 'ADMIN' | 'COMMON';
  Photo: string;

  Age: number;
  Alamat: string;
}
