import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/DB/Entity/user';

import { UserRepository } from 'src/repository/user-repository';
import { UserDto } from 'src/models/user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }


    async getAll(){
        return await this.userRepository.find()
    }

    async getOneUser(username) : Promise<User>{
        return await this.userRepository.findOne(username)
    }

     async findUserDto(username: string,password:string): Promise<User> {
        return await this.userRepository.findOne({username,password})
    }

    async createUser(createDto:UserDto){
        const user = new User()
        user.username = createDto.username
        user.email = createDto.email
        user.password = createDto.password
        user.room = createDto.room   
        // Save To DataBase   
       await user.save()
    }


    async updateRoom(body){
            const {userId, roomName} = body ;
        const editUser = await this.userRepository.findOne(userId) ;
        editUser.room = roomName ;
        this.userRepository.save(editUser) ;
    }


}
