import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
    private readonly saltRounds: number;
    constructor(private readonly configService: ConfigService) {
        // 환경 변수에서 Salt Rounds 가져오기, 기본값은 10
        this.saltRounds = parseInt(
            this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10'),
        );
    }

    async hashPassword(
        password: string,
    ): Promise<{ success: boolean; password?: string }> {
        try {
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            return { success: true, password: hashedPassword };
        } catch (error) {
            console.error('Error hashing password:', error);
            return { success: false };
        }
    }

    async comparePassword(
        inputPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        try {
            return await bcrypt.compare(inputPassword, hashedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    }
}
