import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { Storage } from '@ionic/storage';
import { SECRET_KEY } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey: string = SECRET_KEY;

  constructor(private storage: Storage) {}

  save(key: string, value: any): Promise<void> {
    const stringified = JSON.stringify(value);
    const encrypted = AES.encrypt(stringified, this.secretKey);
    return new Promise((resolve) => {
      this.storage.set(key, encrypted.toString()).then(() => resolve());
    });
  }

  load(key: string): Promise<any> {
    return new Promise((resolve) => {
      this.storage.get(key).then((res) => {
        if (res.value != null) {
          const decrypted = AES.decrypt(res.value, this.secretKey);
          const object = JSON.parse(decrypted.toString(enc.Utf8));
          resolve(object);
        }
        resolve(null);
      });
    });
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.storage.remove(key).then(() => {
        resolve();
      });
    });
  }
}
