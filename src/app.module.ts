import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 글로벌 모듈로 설정 (모든 모듈에서 import 필요 없음)
      envFilePath: '.env', // .env 파일의 경로 (기본값은 루트 디렉터리)
    }),
    UserModule,
    PrismaModule
  ],
})
export class AppModule {}
