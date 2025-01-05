import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { invalidToken, isNotAuthUser, notExistAuthHeader } from 'share/error-msg/server';
import { USER_ROLE } from 'share/var/user.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly auth: AuthService) {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        if (!token) {
            throw new UnauthorizedException(notExistAuthHeader);
        }
        try {
            // JWT 토큰 검증
            const payload = this.auth.verifyToken(token);
            request.user = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException(invalidToken);
        }
    }
}

export class AdminGuard extends AuthGuard {
    canActivate(context: ExecutionContext): boolean {
        const isAuth = super.canActivate(context);
        if (!isAuth) {
            throw new UnauthorizedException(isNotAuthUser);
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user.role === USER_ROLE.ADMIN) {
            return true;
        } else {
            return false;
        }
    }
}