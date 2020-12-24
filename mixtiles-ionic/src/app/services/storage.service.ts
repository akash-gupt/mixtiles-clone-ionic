import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SECRET_KEY } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private secretKey: string = SECRET_KEY;

  constructor(private storage: Storage) {}

  save(key: string, value: any): Promise<void> {
    return new Promise((resolve) => {
      this.storage.set(key, value).then(() => resolve());
    });
  }

  load(key: string): Promise<any> {
    return this.storage.get(key);
  }

  remove(key: string): Promise<void> {
    return new Promise((resolve) => {
      this.storage.remove(key).then(() => {
        resolve();
      });
    });
  }
}
