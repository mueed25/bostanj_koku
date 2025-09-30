import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUser } from "./dto/createUser.dto";
import { loginDto } from "./dto/login.dto";
import { UserGuard } from "./guards/users.guard";
import { Roles } from "./decorators/roles.decorators";
import { Role } from "./roles/role.enum";


@Controller('users')
export class UsersController {
    constructor (
        private UsersService : UserService
    ) {}

    @Get()
    findAll() {
        return this.UsersService.findAll()
    }


    @UseGuards(UserGuard, )
    @Roles(Role.Admin)
    @Get('profile')
    getProfile(@Request() req) {
        return this.UsersService.findOne(req.user.sub)
    }
}