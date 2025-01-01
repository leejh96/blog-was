import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordService } from 'share/util/password';

@Module({
  imports: [PrismaModule],
  providers: [UserService, PasswordService],
  controllers: [UserController]
})
export class UserModule {}
