import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { CreateFileBody, Endpoints } from '../app.constant';
import { AuthenticationService } from '../services';

@Injectable()
export class ReviewService {
  constructor(private http: HTTP, private auth: AuthenticationService) {}

  async createFile(createFileBody: CreateFileBody): Promise<boolean> {
    const headers = await this.auth.getHeaders();

    try {
      await this.http.post(Endpoints.CREATE_FILE, createFileBody, headers);
      return true;
    } catch (error) {
      console.log('[createFile] error => ', error);
      return false;
    }
  }
}
