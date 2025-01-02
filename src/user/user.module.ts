import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordService } from 'share/util/password';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // .env 파일에서 JWT_SECRET 읽기
        signOptions: { expiresIn: '6h' }, // 기본값 1시간
      }),
      inject: [ConfigService],
    }),
    PrismaModule
  ],
  providers: [UserService, PasswordService],
  controllers: [UserController]
})
export class UserModule {}
