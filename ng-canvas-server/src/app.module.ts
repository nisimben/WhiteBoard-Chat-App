import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { ConfigDb} from './DB/config-db'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:ConfigDb
  })],
  controllers: [],
  providers: [AppGateway,ConfigDb],
})
export class AppModule {}
