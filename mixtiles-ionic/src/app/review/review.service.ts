import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { CreateFileBody, Endpoints, FileUploadResponse } from '../app.constant';
import { AuthenticationService } from '../services';

@Injectable()
export class ReviewService {
  constructor(
    private transfer: FileTransfer,
    private http: HTTP,
    private auth: AuthenticationService
  ) {}

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

  async upload(
    imagePath: string,
    fileName: string
  ): Promise<FileUploadResponse | null> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const headers = await this.auth.getHeaders();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileName,
      headers: headers,
    };

    return new Promise((resolve) => {
      fileTransfer.upload(imagePath, Endpoints.UPLOAD_FILE, options).then(
        (data) => {
          const res: FileUploadResponse = JSON.parse(data.response);
          resolve(res);
          console.log('[upload] success => ', data);
        },
        (err) => {
          console.log('[upload] error => ', err);
          resolve(null);
        }
      );
    });
  }
}
