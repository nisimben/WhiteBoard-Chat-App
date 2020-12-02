import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule } from '@angular/router';
import { ChatService } from './services/chat.service';
import { HomeComponent } from './client/home/home.component';

import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule} from '@angular/common/http'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    BrowserAnimationsModule,
    MatSliderModule,
    RouterModule,
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [AuthGuard,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
