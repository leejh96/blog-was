import {
    IsEmail,
    IsString,
    MaxLength,
    Matches,
    IsDateString,
    IsEnum,
    IsUrl,
    IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {
    invalidPassword,
    invalidString,
    invalidEmailForm,
    invalidJwtToken,
} from 'share/error-msg/dto';
import { USER_GENDER, USER_PROVIDER } from 'share/var/user.enum';
import { User } from 'src/user/interface/user.interface';
import { GlobalResDto } from 'share/global.dto';

const Trim = () =>
    Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    );

export class SigninReqDto {
    @Trim()
    @IsString({ message: invalidString('이메일') })
    @IsEmail({}, { message: invalidEmailForm })
    email: string;

    @Trim()
    @IsString({ message: invalidString('비밀번호') })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
        message: invalidPassword,
    })
    password: string;
}
export class SigninResDto extends GlobalResDto {
    @IsString({ message: invalidString('토큰') })
    @Matches(/^[A-Za-z0-9-_=]+?\.[A-Za-z0-9-_=]+?\.([A-Za-z0-9-_=]+)?$/, {
        message: invalidJwtToken,
    })
    token: string;
}
