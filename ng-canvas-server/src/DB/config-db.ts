import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class ConfigDb implements TypeOrmOptionsFactory{

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'qa12345',
            database: 'canvas-DB',
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
        }
    }
}