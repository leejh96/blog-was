import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { invalidToken, notExistAuthHeader } from 'share/error-msg/server';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException(notExistAuthHeader);
        }

        try {
            // JWT 토큰 검증
            const payload = this.jwtService.verify(token);
            request.userIdx = payload.userIdx;
            return true;
        } catch (err) {
            throw new UnauthorizedException(invalidToken);
        }
    }
}
