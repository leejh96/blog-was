import {
    IsEmail,
    IsString,
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
    invalidCharacter,
    invalidFiled,
} from 'share/error-msg/dto';
import { USER_GENDER, USER_PROVIDER } from 'share/var/user.enum';
import { User } from 'src/user/interface/user.interface';
import { GlobalResDto } from 'share/global.dto';

const Trim = () =>
    Transform(({ value }: TransformFnParams) =>
        typeof value === 'string' ? value.trim() : value,
    );

export class SignupReqDto {
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

    @Trim()
    @IsString({ message: invalidString('이름') })
    @Matches(/^[a-zA-Z가-힣]{1,20}$/, {
        message: invalidCharacter('이름', 1, 20),
    })
    name: string;

    @Trim()
    @IsString({ message: invalidString('닉네임') })
    @Matches(/^[a-zA-Z가-힣0-9]{1,20}$/, {
        message: invalidCharacter('닉네임', 1, 20),
    })
    nickname: string;

    // 선택적 필드들
    @IsOptional()
    @IsEnum(USER_GENDER, { message: invalidFiled('성별') })
    gender?: number;
}

type UserPickedField = Pick<User, 'userIdx'>;
export class SignupResDto extends GlobalResDto implements UserPickedField {
    userIdx: number;
}
