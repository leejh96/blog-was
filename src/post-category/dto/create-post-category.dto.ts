import { IsEmail, IsString, MaxLength, Matches, IsDateString, IsEnum, IsUrl, IsOptional, Length, IsNotEmpty } from 'class-validator'
import { Transform, TransformFnParams } from 'class-transformer';
import { invalidString, invalidLength, invalidFiled } from 'share/error-msg/dto';
import { GlobalResDto } from 'share/global.dto';


const ToLowerCase = () =>
    Transform(({ value }: TransformFnParams) => (typeof value === 'string' ? value.toLowerCase() : value));

export class CreatePostCtgryReqDto {
    @IsNotEmpty({ message: invalidFiled('이름') })
    @IsString({ message: invalidString('이름') })
    @Length(1, 15, { message: invalidLength('카테고리', 1, 15)}) //null, undefined 체크 불가능
    @ToLowerCase()
    name: string;

    @IsString({ message: invalidString('설명') })
    @Length(1, 30, { message: invalidLength('카테고리', 1, 30)})
    @ToLowerCase()
    description?: string;
}

export class CreatePostCtgryResDto extends GlobalResDto {
    postCtgryIdx: number;
}