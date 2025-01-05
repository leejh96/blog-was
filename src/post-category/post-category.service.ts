import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostCtgryReqDto } from './dto/create-post-category.dto';
import { existPostCtgry } from 'share/error-msg/server';

@Injectable()
export class PostCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async createPostCtgry (arg: CreatePostCtgryReqDto):Promise<number> {
        const { name, description } = arg;
        // 1. 중복된 카테고리 체크
        const ctgry = this.prisma.postCategory.findUnique({
            where: { name, enable: true },
            select: { postCategoryIdx: true }
        });

        if (ctgry) {
            throw new ConflictException(existPostCtgry);
        }

        // 2. 카테고리 생성
        const newCtgry = await this.prisma.transaction((prisma) => {
            return prisma.postCategory.create({
                data: { name, description },
                select: { postCategoryIdx: true }
            })
        });
        return newCtgry.postCategoryIdx;
    }
}
