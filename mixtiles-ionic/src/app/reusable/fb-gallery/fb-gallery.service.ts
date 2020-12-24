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

  downloadAndSaveTempFile(url: string): Promise<string | null> {
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
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
}
