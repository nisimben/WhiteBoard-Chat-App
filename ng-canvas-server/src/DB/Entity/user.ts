import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    email:string
}