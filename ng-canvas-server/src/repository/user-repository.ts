
import { EntityRepository, Repository } from "typeorm";
import { User } from "src/DB/Entity/user";


@EntityRepository(User)
export class UserRepository extends Repository<User>{}

