import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import {
    CreatePostCtgryReqDto,
    CreatePostCtgryResDto,
} from './dto/create-post-category.dto';
import { defaultSuccessRes } from 'share/var/default.res';
import { AdminGuard } from 'src/guard/auth.guard';
@Controller('post-category')
export class PostCategoryController {
    constructor(private readonly postCtgrySvc: PostCategoryService) {}

    @Post()
    @UseGuards(AdminGuard)
    async createPostCtgry(
        @Body() body: CreatePostCtgryReqDto,
    ): Promise<CreatePostCtgryResDto> {
        // 카테고리 생성
        const postCtgryIdx = await this.postCtgrySvc.createPostCtgry(body);
        return {
            ...defaultSuccessRes,
            postCtgryIdx,
        };
    }
}
