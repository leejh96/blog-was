import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserModule } from 'src/user/user.module';
import { PostCategoryModule } from 'src/post-category/post-category.module';

@Module({
    imports: [UserModule],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule { }
