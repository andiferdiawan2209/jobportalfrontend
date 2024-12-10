import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginReqDto } from '../model/auth.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageBoxService: MessageBoxService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const data: LoginReqDto = this.loginForm.getRawValue();
            console.log('form submit', data);
            this.authService.login(data).subscribe({
                next: (response) => {
                    const obj = JSON.parse(response);
                    this.authService.saveLoginData(obj.data);
                    console.log('User Login successfully:', response);
                    this.router.navigate(['/admin/dashboard']);
                },
                error: (err) => {
                    console.error('Login gagal:', err);
                    let parsedError = err;
                    if (typeof err === 'string') {
                        try {
                            parsedError = JSON.parse(err);
                        } catch (parseError) {
                            console.error('Gagal parsing error:', parseError);
                        }
                    }
                    const errorMessage =
                        parsedError?.errors?.reason?.[0] ||
                        'Terjadi kesalahan.';
                    this.messageBoxService.showError(errorMessage);
                    console.error('Error creating user:', err);
                },
            });
        } else {
            this.loginForm.markAllAsTouched();
            console.log('Form is invalid');
        }
    }
}
