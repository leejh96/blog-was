import { Body, Controller, Get, Header, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupReqDto, SignupResDto } from './dto/signup.dto';
import { SigninReqDto, SigninResDto } from './dto/signin.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { GetUserResDto } from './dto/get-user.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signup(@Body() body: SignupReqDto): Promise<SignupResDto>{
        // 회원가입
        const userIdx = await this.userService.signup(body);
        return { userIdx };
    }

    @Post('/signin')
    async signin(@Body() body: SigninReqDto): Promise<SigninResDto> {
        // 로그인
        const token = await this.userService.signin(body);
        return { token };
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@Req() req: any): Promise<GetUserResDto> {
        const userIdx = req.userIdx;
        const user = await this.userService.getUser(userIdx);
        return { user };
    }
}
