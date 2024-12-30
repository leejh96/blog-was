import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async signup(email) {
        const findUser = await this.prisma.userInfo.findUnique({
            where: { email },
            select: { userIdx: true }
        });
    }
}
