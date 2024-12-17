import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupReqDto } from './dto/signup/signup-req.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signup(@Body() body: SignupReqDto) {
        // 회원가입
        const { email, password, username, nick } = body;
        // [1] email에 해당하는 계정 존재여부 파악
        const existUser = await this.userService.checkExistUser();
        if (existUser) {

        }
    }
}
