import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private auth: AuthenticationService,
    private menu: MenuController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.auth.isAuthenticated().then((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  toggle() {
    this.menu.toggle();
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  logout() {
    this.auth.logout().then(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
