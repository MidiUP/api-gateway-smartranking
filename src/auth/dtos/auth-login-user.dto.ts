import { IsEmail, Matches } from 'class-validator';

export class AuthLoginUserDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password is not valid',
  })
  password: string;
}
