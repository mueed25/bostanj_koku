import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUser } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt' 
import { loginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService : JwtService
    ) {}

    findAll() : Promise<User[]> {
        return this.userRepository.find()
    }

    async create( createUser : CreateUser) {
        const user = await this.userRepository.create(createUser)
        return await this.userRepository.save(user)
    }

    async findOne(email: string  ) : Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email : email
            }
        })
        if (!user) throw new UnauthorizedException()
        return user
    }

}