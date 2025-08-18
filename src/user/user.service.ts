import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    serverError,
    existUser,
    notExistUser,
    invalidPassword,
} from 'share/error-msg/server';
import { PasswordService } from 'share/util/password';
import { SignupUserInfo, UserInfo } from './interface/user.interface';
import { USER_ROLE, USER_STATUS } from 'share/var/user.enum';
import { SignupReqDto } from './dto/signup.dto';
import { SigninReqDto } from './dto/signin.dto';
import { formatDate, nowUtc, utcToKst } from 'share/util/dayjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordUtil: PasswordService,
        private readonly auth: AuthService,
    ) {}

    async signup(arg: SignupReqDto) {
        const { email, password, name, nickname } = arg;
        return this.prisma.transaction(async (prisma) => {
            // 1. 중복 유저 확인 (이메일)
            const findUser = await prisma.userInfo.findUnique({
                where: { email },
                select: { userIdx: true },
            });

            if (findUser) {
                throw new ConflictException(existUser);
            }

            // 1-2. 중복 닉네임 확인
            const findNickname = await prisma.userInfo.findFirst({
                where: { nickname, enable: true },
                select: { userIdx: true },
            });

            if (findNickname) {
                throw new ConflictException('이미 사용 중인 닉네임입니다.');
            }

            // 2. 비밀번호 암호화
            const hashData = await this.passwordUtil.hashPassword(password);
            if (!hashData.success) {
                throw new Error(serverError);
            }

            // 3. 기본 정보 추가
            const signupInfo: SignupUserInfo = {
                email,
                name,
                nickname,
                password: hashData.password,
                role: USER_ROLE.USER,
                status: USER_STATUS.ACTIVE,
                gender: arg.gender || null,
            };

            // 4. 회원 정보 저장
            const user = await prisma.userInfo.create({
                data: signupInfo,
                select: {
                    userIdx: true,
                },
            });

            return user.userIdx;
        });
    }

    async signin(arg: SigninReqDto) {
        const { email, password } = arg;
        // 1. email로 유저 조회
        const user = await this.prisma.userInfo.findUnique({
            where: {
                email,
                enable: true,
            },
            select: {
                userIdx: true,
                password: true,
                email: true,
                name: true,
                nickname: true,
                gender: true,
                role: true,
                lastLoginTime: true,
                status: true,
            },
        });

        if (!user) {
            throw new NotFoundException(notExistUser);
        }

        // 2. 비밀번호 비교
        const compare = await this.passwordUtil.comparePassword(
            password,
            user.password,
        );

        if (!compare) {
            throw new UnauthorizedException(invalidPassword);
        }

        // 3. JWT 생성
        delete user.password; // password 정보 제거
        const token = this.auth.generateToken(user);

        // 4. lastLoginTime 업데이트
        await this.prisma.transaction(async (prisma) => {
            await prisma.userInfo.update({
                where: { userIdx: user.userIdx },
                data: { lastLoginTime: nowUtc },
            });
        });

        return token;
    }

    async getUser(userIdx: number) {
        const user = await this.prisma.userInfo.findUnique({
            where: { userIdx, enable: true },
            select: {
                userIdx: true,
                email: true,
                name: true,
                nickname: true,
                gender: true,
                role: true,
                lastLoginTime: true,
                status: true,
            },
        });

        return {
            ...user,
            lastLoginTime: utcToKst(user.lastLoginTime),
        };
    }
}
