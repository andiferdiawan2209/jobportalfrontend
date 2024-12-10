import { Injectable } from '@angular/core';
import {
    LoginReqDto,
    LoginResDto,
    OtpReqDto,
    RegisterReqDto,
    UserSessionResponse,
} from '../model/auth.model';

import { ApiService } from '@core/service/api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUser: LoginResDto | null = null;

    constructor(private api: ApiService, private router: Router) {}

    login(body: LoginReqDto) {
        return this.api.postLogin('login', body, false);
    }

    register(body: RegisterReqDto) {
        return this.api.post('register', body, false);
    }

    verifyOtp(body: OtpReqDto) {
        return this.api.post('verify', body, false);
    }

    resendOtp() {
        return this.api.post('resend-otp', null, false);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.currentUser = null;
        this.router.navigateByUrl('/login');
    }

    getCurrentUser() {
        const loginData = localStorage.getItem('token');
        return loginData ? JSON.parse(loginData) : null;
    }

    saveLoginData(login: any): void {
        localStorage.setItem('token', JSON.stringify(login));
    }

    getLoginData(): UserSessionResponse {
        const loginData = localStorage.getItem('token');
        if (!loginData) {
            throw new Error('Token not found in localStorage');
        }

        const tokenObject = JSON.parse(loginData);
        const token = tokenObject.token;

        // Decode the JWT payload
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        const payloadObject = JSON.parse(decodedPayload);

        const userSession: UserSessionResponse = {
            role: payloadObject.role,
            userId: payloadObject.userId,
            username: payloadObject.username,
            sub: payloadObject.sub,
            iat: payloadObject.iat,
            exp: payloadObject.exp,
        };

        return userSession;
    }
}
