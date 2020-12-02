import { Injectable } from '@nestjs/common';
import { User } from 'src/DB/Entity/user';

import { UserRepository } from 'src/repository/user-repository';
import { UserDto } from 'src/models/user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

     findUserDto(email: string,password:string): Promise<User> {
        console.log(email,password,"find");
        
        return  this.userRepository.findOne({username: email,password: password })
    }
    async createUser(createDto:UserDto) {
        const user = new User()
        user.username = createDto.username
        user.email = createDto.email
        user.password = createDto.password  
        // Save To DataBase   
       await user.save()
    }


}
