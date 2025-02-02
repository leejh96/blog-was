import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, Max, MaxLength } from "class-validator";
import { invalidFiled } from "share/error-msg/dto";
import { GlobalResDto } from "share/global.dto";
import { Post } from "@prisma/client"

export class CreatePostReqDto {
    @IsNotEmpty()
    @MaxLength(500, { message: invalidFiled('제목') })
    title: string;

    @IsNotEmpty()
    @MaxLength(50000, { message: invalidFiled('본문') })
    content: string;

    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;

    @IsOptional()
    @IsDateString()
    publishedAt?: string | Date

    @IsNotEmpty()
    @IsInt()
    userIdx: number;

    @IsNotEmpty()
    @IsInt()
    postCategoryIdx: number;
}

export class CreatePostResDto extends GlobalResDto {
    post: Post
}