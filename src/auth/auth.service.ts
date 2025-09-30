import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from 'src/users/dto/createUser.dto';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}


    async validateUser( email : string , password : string ) {
        const user = await this.usersService.findOne(email)
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch)  return null
        return user
    }

    async login(user : any) {
        const payload = { sub: user.id , email: user.email}
        const accessToken = await this.jwtService.signAsync(payload)
        return {
            access_token: accessToken,
            email: user.email
        }
    }

    async register (createUser : CreateUser) {
        console.log(createUser)
        const hash = await bcrypt.hashSync(createUser.password, 10)
        const newUser = {
            ...createUser,
            password: hash
        }

        const user = await this.usersService.create(newUser)
        const accessToken = await this.jwtService.signAsync({ sub: user.id , email: user.email})
        return {
            user: user,
            access_token: accessToken
        }
    }

    async profile (email : string) {
        const user = await this.usersService.findOne(email)
        return {
            email: user.email
        }
    }

    async logout() {
    }
}
