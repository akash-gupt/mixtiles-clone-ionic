import { Injectable, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FbGalleryComponent } from './fb-gallery.component';
import { FbService } from './fb.service';

@Injectable()
export class FbGalleryService {
  modal: HTMLIonModalElement;

  constructor(
    private modalController: ModalController,
    private fbService: FbService
  ) {}

  private async getModal() {
    if (!this.modal) {
      this.modal = await this.modalController.create({
        component: FbGalleryComponent,
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
}
