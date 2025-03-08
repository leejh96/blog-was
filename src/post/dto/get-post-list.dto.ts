import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { invalidNumber } from "share/error-msg/dto";
import { GlobalResDto } from "share/global.dto";

export class GetPostListDto {
    @Type(() => Number)
    @Transform(({ value }) => value ?? 1) // 디폴트값 1
    @IsOptional() // 값이 없을 경우 검사를 건너뜀
    @IsNumber({}, { message: invalidNumber('페이지') })
    page?: number;

    @Type(() => Number)
    @Transform(({ value }) => value ?? 10) // 디폴트값 10
    @IsOptional() // 값이 없을 경우 검사를 건너뜀
    @IsNumber({}, { message: invalidNumber('가져올 갯수') })
    limit?: number;
}

export class Post {
    postIdx: number;
    title: string;
    isPublished: boolean;
    publishedAt: Date | null;
    userIdx: number;
    postCategoryIdx: number;
    createdAt: Date;
    updatedAt: Date;
    author: {
        userIdx: number;
        nickname: string;
    };
}

export class GetPostListResDto extends GlobalResDto {
    result: Post[];
}