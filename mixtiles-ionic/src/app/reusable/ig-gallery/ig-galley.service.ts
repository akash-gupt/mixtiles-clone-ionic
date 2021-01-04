import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IgGalleryModalComponent } from './ig-gallery-modal/ig-gallery-modal.component';
import { IgService } from './ig.service';
import { FacebookPhotoResponse } from './types';

@Injectable()
export class IgGalleyService {
  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private igService: IgService
  ) {}

  private async getModal() {
    if (!this.modal) {
      this.modal = await this.modalController.create({
        component: IgGalleryModalComponent,
      });
    }

    return this.modal;
  }

  async open() {
    const modal = await this.getModal();

    // const status = await this.igService.login();
    await modal.present();
  }

  async close() {
    const modal = await this.getModal();
    await modal.dismiss();
    this.modal = null;
  }

  async paginatePhotos(after: string = null): Promise<FacebookPhotoResponse> {
    return this.igService.paginatePhotos(after);
  }
}
