import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { invalidFiled, invalidNumber } from "share/error-msg/dto";

export class GetPostDto {
    @Type(() => Number)
    @IsNotEmpty({ message: invalidFiled('게시글') })
    @IsNumber({}, { message: invalidNumber('게시글 번호') })
    postIdx: number;
}