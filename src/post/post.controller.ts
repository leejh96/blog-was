import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AdminGuard } from 'src/guard/auth.guard';
import { GetPostDto } from './dto/get-post.dto';
import { GetPostListDto } from './dto/get-post-list.dto'
import { defaultSuccessRes } from 'share/var/default.res';

@Controller('post')
export class PostController {
    constructor(private readonly post: PostService) { }
    @Get()
    async getPostList(@Query() query: GetPostListDto) {
        query.page = query.page ?? 1;
        query.limit = query.limit ?? 10;
        const result = await this.post.getPostList(query);
        return { ...defaultSuccessRes, result };
    }
    @Get(':postIdx')
    async getPost(@Param() params: GetPostDto) {
        const result = await this.post.getPost(params);
        return { ...defaultSuccessRes, result };
    }


}
