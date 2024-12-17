import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class SignupReqDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @MaxLength(30)
    username: string;
    
    @IsString()
    @MaxLength(30)
    nick: string;
}