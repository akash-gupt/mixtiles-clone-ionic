import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IgGalleryComponent } from './ig-gallery.component';
import { IgService } from './ig.service';

@Injectable()
export class IgGalleyService {
  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private fbService: IgService
  ) {}

  private async getModal() {
    if (!this.modal) {
      this.modal = await this.modalController.create({
        component: IgGalleryComponent,
      });
    }

    return this.modal;
  }

  async open() {
    const modal = await this.getModal();

    const status = await this.fbService.login();
    if (status) {
      await modal.present();
    }
  }

  async close() {
    const modal = await this.getModal();
    await modal.dismiss();
    this.modal = null;
  }
}
