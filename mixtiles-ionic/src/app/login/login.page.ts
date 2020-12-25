import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public form: FormGroup;
  public validationMessages = {
    email: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'Min 3 characters' },
      { type: 'email', message: 'Invalid email' },
    ],
    password: [{ type: 'required', message: 'Required' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    public toastController: ToastController,
    private loading: LoadingController
  ) {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      if (isAuthenticated) this.router.navigate(['/review']);
    });
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }

  async submitForm() {
    const loader = await this.loading.create({ message: 'loading...' });

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    try {
      await loader.present();
      const response = await this.authService.login(email, password);

      await loader.dismiss();

      if (response) {
        this.router.navigate(['/review']);
      } else {
        this.presentToast('Incorrect credential.', 3000);
      }
    } finally {
      await loader.dismiss();
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
