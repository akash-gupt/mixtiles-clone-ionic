import { Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FbService } from './fb.service';
import { GalleryModalComponent } from './gallery-modal/gallery-modal.component';
import { FacebookImageType, FacebookPhotoResponse } from './types';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class FbGalleryService {
  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private fbService: FbService,
    private file: File,
    private nativeHTTP: HTTP
  ) {}

  private async getModal() {
    if (!this.modal) {
      this.modal = await this.modalController.create({
        component: GalleryModalComponent,
      });
    }

    return this.modal;
  }

  async open() {
    const modal = await this.getModal();

    const status = await this.fbService.loginFb();
    if (status) {
      await modal.present();
    }
  }

  async close() {
    const modal = await this.getModal();
    await modal.dismiss();
    this.modal = null;
  }

  async selectImagesAndClose(data: FacebookImageType[]) {
    const modal = await this.getModal();
    const imagePaths = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const imageUrl = element?.images[0]?.source;
      const imagePath = await this.downloadAndSaveTempFile(imageUrl);

      imagePaths.push(imagePath);
    }

    await modal.dismiss({ imagePaths });
    this.modal = null;
  }

  async selectAndClose(data: FacebookImageType) {
    const modal = await this.getModal();

    const imageUrl = data?.images[0]?.source;
    const imagePath = await this.downloadAndSaveTempFile(imageUrl);
    await modal.dismiss({ imagePath });
    this.modal = null;
  }

  async paginatePhotos(after: string = null): Promise<FacebookPhotoResponse> {
    return this.fbService.paginatePhotos(after);
  }

  async onDismiss() {
    const modal = await this.getModal();
    return modal.onWillDismiss();
  }

  getFileName(file) {
    const fileExtName = this.getExt(file);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${randomName}${fileExtName}`;
  }

  downloadAndSaveTempFile(url: string): Promise<string | null> {
    const fileName = this.getFileName(url);
    const filePath = this.file.dataDirectory + fileName;
    return new Promise((resolve) => {
      this.nativeHTTP
        .downloadFile(url, {}, {}, filePath)
        .then(() => {
          console.log('[saveTempFile] file saved successfully');
          resolve(filePath);
        })
        .catch((err) => {
          console.error('[saveTempFile] file saved failed ', err);
          resolve(null);
        });
    });
  }

  getExt(url) {
    return (url = url.substr(1 + url.lastIndexOf('/')).split('?')[0])
      .split('#')[0]
      .substr(url.lastIndexOf('.'));
  }
}
