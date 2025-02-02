import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostCtgryReqDto } from './dto/create-post-category.dto';
import { existPostCategory } from 'share/error-msg/server';

@Injectable()
export class PostCategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async createPostCtgry(arg: CreatePostCtgryReqDto): Promise<number> {
        const { name, description } = arg;
        // 1. 중복된 카테고리 체크
        const category = await this.prisma.postCategory.findUnique({
            where: { name, enable: true },
            select: { postCategoryIdx: true },
        });
        if (category) {
            throw new ConflictException(existPostCategory);
        }

        // 2. 카테고리 생성
        const newCategory = await this.prisma.transaction((prisma) => {
            return prisma.postCategory.create({
                data: { name, description },
                select: { postCategoryIdx: true },
            });
        });
        return newCategory.postCategoryIdx;
    }
}
