
import { EntityRepository, Repository } from "typeorm";
import { User } from "src/DB/Entity/user";
import { UserDto } from "src/models/user.dto";
;


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async updateRoom(
        createUser:UserDto,
        updateUserRoom:User):Promise<User>{
        const {room,nickname}  = createUser;
        updateUserRoom = new User()
        updateUserRoom.room =room
        updateUserRoom.nickname =nickname
      

        await updateUserRoom.save()
        return updateUserRoom
       
    }
}

