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
import { UserInfo } from 'src/user/interface/user.interface';
import { GlobalResDto } from 'share/global.dto';

const Trim = () =>
    Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    );

export class GetUserResDto extends GlobalResDto {
    user: UserInfo;
}
