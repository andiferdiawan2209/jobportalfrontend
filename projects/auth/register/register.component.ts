import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterReqDto } from '../model/auth.model';
import { MessageBoxService } from '../../../src/app/core/service/message-box.service';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageBoxService: MessageBoxService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            genderId: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            console.log('form submit', this.registerForm.getRawValue());
            const data = this.registerForm.getRawValue();
            this.authService.register(data).subscribe({
                next: (response) => {
                    console.log('User Registered successfully:', response);
                    this.messageBoxService.showSuccess(
                        'User Registered successfully, Check Your Email For Activation Account',
                        null,
                        true,
                        'auth/otp'
                    );
                },
                error: (error) => {
                    this.messageBoxService.showError(
                        'User Registered unsuccessful'
                    );
                    console.error('Error creating user:', error);
                },
            });
        } else {
            this.registerForm.markAllAsTouched();
            console.error('Form is invalid:', this.registerForm.errors);
        }
    }
    onSelectGender(e) {
        console.log(this.registerForm.get('genderId').value);
        this.registerForm.patchValue({ genderId: e.id });
    }
}
