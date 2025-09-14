import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    LoginComponent 
  ]  
  })
export class LoginModule {}
