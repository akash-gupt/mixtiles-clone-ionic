import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Endpoints, RegisterBody, TOKEN_STORAGE_KEY } from '../app.constant';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HTTP, private storage: StorageService) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post(
        Endpoints.LOGIN,
        {
          email,
          password,
        },
        {}
      );

      console.log('[Login] response => ', response.data);

      if (!response.data) {
        return false;
      }

      const data = JSON.parse(response.data);
      console.log('[Login] response => ', data?.accessToken);
      const token = data?.accessToken;
      await this.storage.save(TOKEN_STORAGE_KEY, token);

      return true;
    } catch (error) {
      console.error('[Login] error => ', error);
      return false;
    }
  }

  async logout() {
    await this.storage.remove(TOKEN_STORAGE_KEY);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.load(TOKEN_STORAGE_KEY);
    console.log('[isAuthenticated] token = ', token);
    if (!token || token === null) {
      return false;
    }

    return true;
  }

  async getToken(): Promise<string | null> {
    return this.storage.load(TOKEN_STORAGE_KEY);
  }

  async registerAccount(registerBody: RegisterBody): Promise<boolean> {
    try {
      await this.http.post(Endpoints.REGISTER, registerBody, {});
      return true;
    } catch (error) {
      return false;
    }
  }

  async getHeaders() {
    const token = await this.getToken();

    const headers = {
      Authorization: 'Bearer ' + token,
    };

    console.log('[getHeaders] headers => ', JSON.stringify(headers));
    return headers;
  }
}
