import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordService } from 'share/util/password';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [],
    providers: [UserService, PasswordService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
