import { IsEmail, IsString, MaxLength, Matches, IsDateString, IsEnum, IsUrl, IsOptional } from 'class-validator'
import { Transform, TransformFnParams } from 'class-transformer';
import { invalidPassword, invalidString, invalidEmailForm, invalidCharacter, invalidPhoneNumber, invalidNumber, invalidFiled } from 'share/error-msg/dto';
import { USER_GENDER, USER_PROVIDER } from 'share/var/user.enum';
const Trim = () =>
    Transform(({ value }: TransformFnParams) => (typeof value === 'string' ? value.trim() : value));

export class SignupReqDto {
    @Trim()
    @IsString({ message: invalidString('이메일') })
    @IsEmail({}, { message: invalidEmailForm })
    email: string;

    @Trim()
    @IsString({ message: invalidString('비밀번호') })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, { message: invalidPassword })
    password: string;
    
    @Trim()
    @IsString({ message: invalidString('이름') })
    @Matches(/^[a-zA-Z가-힣]{1,20}$/, { message: invalidCharacter('이름', 1, 20) })
    firstName: string;

    @Trim()
    @IsString({ message: invalidString('성') })
    @Matches(/^[a-zA-Z가-힣]{1,20}$/, { message: invalidCharacter('성', 1, 20) })
    lastName: string;

    @Trim()
    @IsString({ message: invalidString('닉네임') })
    @Matches(/^[a-zA-Z가-힣]{1,20}$/, { message: invalidCharacter('닉네임', 1, 20) })
    nickname: string;

    @Trim()
    @IsString({ message: invalidString('태그') })
    @Matches(/^#[a-zA-Z0-9가-힣]{1,5}$/, { message: invalidCharacter('태그', 1, 5) }) // #포함 숫자영어한글
    tag: string;

    @Transform(({ value }) => (typeof value === 'string' ? value.replace(/-/g, '').trim() : value)) // 하이픈 제거 및 공백 트리밍
    @IsString({ message: invalidString('전화번호') })
    @Matches(/^01[0-9]{1}\d{3,4}\d{4}$/, { message: invalidPhoneNumber })
    phoneNumber: string;

    @IsEnum(USER_GENDER, { message: invalidFiled('성별') })
    gender: number;

    @IsEnum(USER_PROVIDER, { message: invalidFiled('가입 경로') })
    provider: number;

    @Trim()
    @IsDateString({}, { message: invalidFiled('생년월일')})
    dateOfBirth: string;

    @IsOptional() // 필드가 없어도 검증 오류 발생하지 않음
    @Trim()
    @IsString({ message: invalidString('프로필 이미지') }) // 문자열 확인
    @IsUrl({}, { message: invalidFiled('프로필 이미지') }) // 유효한 URL 검증
    profileImage?: string;
}