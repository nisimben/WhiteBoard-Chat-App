import { Controller, Get, Body, Post, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer'
import * as path from 'path'
import  {v4 as uuid4} from 'uuid'
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { UserDto } from 'src/models/user.dto';


export const storage ={
    storage:diskStorage({
        destination:'./upload',
        filename:(req,file,cb)=>{
            const filename:string = path.parse(file.originalname).name.replace(/\s/g,'')+ uuid4();
            const extension:string = path.parse(file.originalname).ext;
            cb(null,`${filename},${extension}`)
            console.log("sadassd");            
        }
    })
}

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    
    @Post('login')
    async findUserByUsernameAndPassword(@Body('username') username:string,@Body('password') password:string ){
        this.userService.findUserDto(username,password).then(user =>{
            console.log(user);
            
        })
        
        return await this.userService.findUserDto(username,password)

    }
    @Post()
    create(@Body() createDto:UserDto){
        return this.userService.createUser(createDto)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('uploadFile',storage))
    uploadFile(@UploadedFile() file){
        console.log(file);
        return {filename:file.filename}

        
    }
    @Get('get-uploaded/filename')
    getUplaodedFile(@Param('filename')filename:string,@Res() res):Observable<object> {
        return of(res.sendFile(join(process.cwd(),'upload/filename',filename)))
    }
}
