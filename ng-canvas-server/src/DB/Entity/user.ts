import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { Options } from "@nestjs/common";
@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    username:string
    @Column()
    email:string
    @Column()
    password:string
    @Column({nullable:true})
    room:string
    @Column({nullable:true})
    nickname:string
}