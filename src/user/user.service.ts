import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { serverError, existUser } from 'share/error-msg/server';
import { PasswordService } from 'share/util/password';
import { SignupUserInfo } from './interface/user.interface';
import { USER_ROLE, USER_STATUS } from 'share/var/user.enum';
import { SignupReqDto } from './dto/signup/signup-req.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly passwordUtil: PasswordService
    ) {}

    async signup(arg: SignupReqDto) {
        const { email, password, dateOfBirth, profileImage = null } = arg;
        // 1. 중복 유저 확인
        const findUser = await this.prisma.userInfo.findUnique({
            where: { email },
            select: { userIdx: true }
        });

        if (findUser) {
            throw new ConflictException(existUser);
        }

        // 2. 비밀번호 암호화
        const hashData = await this.passwordUtil.hashPassword(password);
        if (!hashData.success) {
            throw new Error(serverError)
        }

        // 3. 기본 정보 추가
        const signupInfo: SignupUserInfo = {
            ...arg,
            dateOfBirth: new Date(dateOfBirth),
            role: USER_ROLE.USER,
            password: hashData.password,
            status: USER_STATUS.ACTIVE,
            profileImage,
        }

        // 4. 회원 정보 저장
        const user = await this.prisma.userInfo.create({
            data: signupInfo,
        });

        return user;
    }
}
