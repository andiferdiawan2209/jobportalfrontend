import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { OtpReqDto } from '../model/auth.model';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
    otpForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private messageBox: MessageBoxService
    ) {}

    ngOnInit(): void {
        this.otpForm = this.fb.group({
            otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        });
    }

    onSubmit(): void {
        if (this.otpForm.valid) {
            const otpCode: OtpReqDto = this.otpForm.getRawValue();
            this.authService.verifyOtp(otpCode).subscribe(
                (response) => {
                    this.messageBox.showSuccess(
                        'User Active Successfully',
                        'Success',
                        true,
                        'auth/login'
                    );
                },
                (error) => {
                    console.error('OTP Verification Failed', error);
                    this.messageBox.showError('Invalid OTP');
                }
            );
        }
    }

    resendOtp(): void {
        this.authService.resendOtp().subscribe(
            (response) => {
                console.log('OTP Resent Successfully');
                this.messageBox.showSuccess(
                    'OTP Resent Successfully',
                    'Success',
                    false
                );
            },
            (error) => {
                console.error('Failed to Resend OTP', error);
                this.messageBox.showError('Failed to Resend OTP');
            }
        );
    }
}
