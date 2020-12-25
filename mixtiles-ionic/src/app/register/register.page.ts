import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from '../reusable/validators/password-validator';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public form: FormGroup;
  public validationMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minlength', message: 'Invalid email' },
      { type: 'email', message: 'Invalid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Minimum 5 characters is required.' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password.' },
      { type: 'areEqual', message: 'Password must match' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [Validators.required, Validators.minLength(3), Validators.email],
        ],
        password: ['', [Validators.minLength(5), Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: PasswordValidator.areEqual('password', 'confirmPassword'),
      }
    );
  }

  async submitForm() {
    const account = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };

    const response = await this.authService.registerAccount(account);
    if (response) {
      this.router.navigate(['/login']);
    } else {
      this.presentToast('register failed');
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
    });
    toast.present();
  }
}
