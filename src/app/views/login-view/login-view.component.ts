import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, CommonModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatButton, MatFormFieldModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  providers: [AuthService]
})
export class LoginViewComponent {
  constructor(private authSer: AuthService, private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    emailFormControl: this.emailFormControl,
    passwordFormControl: this.passwordFormControl,
  });

  public onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        adminUser: this.loginForm.value.emailFormControl || '',
        adminPassword: this.loginForm.value.passwordFormControl || '',
      };
      this.authSer.authenticate(credentials).subscribe(
        (response: any) => {
          console.log('Login exitoso!', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  matcher = new MyErrorStateMatcher();
}
