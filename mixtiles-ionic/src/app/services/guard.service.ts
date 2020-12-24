import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    return this.checkAuthentication();
  }

  async checkAuthentication(): Promise<boolean> {
    // Implement your authentication in authService
    const isAuthenticate: boolean = await this.authService.isAuthenticated();
    console.log('[GuardService] isAuthenticate = ', isAuthenticate);
    if (!isAuthenticate) {
      this.router.navigate(['/login']);
      return false;
    }
    return isAuthenticate;
  }
}
