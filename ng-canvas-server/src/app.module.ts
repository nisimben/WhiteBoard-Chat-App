import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConfigDb} from './DB/config-db'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repository/user-repository';



@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:ConfigDb
  }),
TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [AppGateway,ConfigDb, UserService],
})
export class AppModule {}
