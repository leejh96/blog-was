import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { NoticeModule } from './notice/notice.module';
import { PostCategoryModule } from './post-category/post-category.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // ConfigModule을 글로벌 모듈로 설정 (모든 모듈에서 import 필요 없음)
            envFilePath: '.env', // .env 파일의 경로 (기본값은 루트 디렉터리)
        }),
        UserModule,
        PrismaModule,
        PostModule,
        NoticeModule,
        PostCategoryModule,
        AuthModule,
    ],
})
export class AppModule {}
