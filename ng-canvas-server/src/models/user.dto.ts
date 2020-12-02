import { IsNotEmpty, IsEmail, IsString, IsJWT } from 'class-validator'
export class UserDto {
    @IsString()
    username?:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsJWT()
    token?:string
}
