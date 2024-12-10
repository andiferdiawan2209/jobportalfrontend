import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { OtpComponent } from './otp/otp.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, OtpComponent, CountdownComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        CardModule,
        DropdownModule,
        InputTextModule,
        ToastModule,
        FormsModule,
        InputSwitchModule,
        ReactiveFormsModule,
        SharedComponentModule,
        ImageModule,
        PasswordModule,
    ],
})
export class AuthModule {}
