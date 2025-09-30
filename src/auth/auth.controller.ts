import { Body, Controller, Get, Post, Request, Res, Response, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./strategies/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./strategies/jwt-auth.guard";
import { CreateUser } from "src/users/dto/createUser.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() createUser: CreateUser, @Response({ passthrough: true }) res) {
        const {access_token , user }= await this.authService.register(createUser)

        res.cookie('access_token', access_token, {
            httpOnly: true,
            sameSite: 'strict', 
            secure: process.env.NODE_ENV === 'production',
        });
        return {
            user: user
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response({ passthrough: true }) res) {
    const { access_token, email } = await this.authService.login(req.user);

    res.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict', 
        secure: process.env.NODE_ENV === 'production',
    });

    return { email }; 
    }

    @Post('logout')
    async logout(@Request() req, @Response({ passthrough: true }) res) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return {
            email: req.user.email
        }
    }
}