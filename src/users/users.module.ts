import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/constants/constants";



@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn : '1h'}
    })],
    providers : [UserService],
    controllers : [UsersController],
    exports: [UserService]
})

export class UsersModule {}