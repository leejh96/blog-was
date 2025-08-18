import {
    Body,
    Controller,
    Get,
    Header,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupReqDto, SignupResDto } from './dto/signup.dto';
import { SigninReqDto, SigninResDto } from './dto/signin.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { GetUserResDto } from './dto/get-user.dto';
import { defaultSuccessRes } from 'share/var/default.res';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async signup(@Body() body: SignupReqDto): Promise<SignupResDto> {
        // 회원가입
        console.log(body);
        const userIdx = await this.userService.signup(body);
        return {
            ...defaultSuccessRes,
            userIdx,
        };
    }

    @Post('/signin')
    async signin(@Body() body: SigninReqDto): Promise<SigninResDto> {
        // 로그인
        const token = await this.userService.signin(body);
        return { ...defaultSuccessRes, token };
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUser(@Req() req: any): Promise<GetUserResDto> {
        // 유저 정보 조회
        const userIdx = req.user.userIdx;
        const user = await this.userService.getUser(userIdx);
        return { ...defaultSuccessRes, user };
    }
}
