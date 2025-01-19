import { Module } from '@nestjs/common';
import { PostCategoryController } from './post-category.controller';
import { PostCategoryService } from './post-category.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [PostCategoryController],
    providers: [PostCategoryService],
    exports: [PostCategoryService]
})
export class PostCategoryModule { }
