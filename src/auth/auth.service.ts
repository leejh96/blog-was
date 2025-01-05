import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInfo } from 'src/user/interface/user.interface';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService) {}

    // token 생성
    generateToken(user: UserInfo): string {
        const payload = user; // JWT 페이로드
        return this.jwt.sign(payload);
    }

    // JWT 토큰 검증
    verifyToken(token: string): UserInfo {
        return this.jwt.verify(token);
    }
}