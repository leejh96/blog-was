import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AdminGuard, AuthGuard } from 'src/guard/auth.guard';
import { GetPostDto } from './dto/get-post.dto';
import { GetPostListDto, GetPostListResDto } from './dto/get-post-list.dto'
import { defaultSuccessRes } from 'share/var/default.res';
import { CreatePostReqDto, CreatePostResDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly post: PostService) { }
    @Get()
    async getPosts(@Query() query: GetPostListDto) {
        query.page = query.page ?? 1;
        query.limit = query.limit ?? 10;
        const result = await this.post.getPosts(query);
        return { ...defaultSuccessRes, result };
    }

    @Get(':postIdx')
    @UseGuards(AuthGuard)
    async getPost(@Param() params: GetPostDto) {
        const result = await this.post.getPost(params);
        return { ...defaultSuccessRes, result };
    }

    @Post()
    @UseGuards(AdminGuard)
    async createPost(@Body() body: CreatePostReqDto): Promise<CreatePostResDto> {
        const result = await this.post.createPost(body);
        return { ...defaultSuccessRes, post: result };
    }
}
