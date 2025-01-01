import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupReqDto } from './dto/signup/signup-req.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signup(@Body() body: SignupReqDto) {
        // 회원가입
        const user = await this.userService.signup(body);
        return user;
    }
}
