import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPassComponent ],
  imports: [
    CommonModule,

    FormsModule,
  ],
  exports:[LoginComponent, RegisterComponent, ResetPassComponent]
})
export class AuthModule { }
