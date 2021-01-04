import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { File } from '@ionic-native/file/ngx';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';

@Injectable()
export class CropImageService {
  private modal: HTMLIonModalElement;
  private pathImg: string;
  private frame: string;

  constructor(
    private modalController: ModalController,
    private base64ToGallery: Base64ToGallery,
    private file: File
  ) {}

  private async getModal() {
    if (!this.modal) {
      this.modal = await this.modalController.create({
        component: CropImageModalComponent,
        componentProps: {
          pathImg: this.pathImg,
          frame: this.frame,
        },
      });
    }

    return this.modal;
  }

  async open(imageUrl: string, frame: string) {
    this.pathImg = imageUrl;
    this.frame = frame;
    const modal = await this.getModal();
    await modal.present();
  }

  async close() {
    const modal = await this.getModal();
    await modal.dismiss();
    this.modal = null;
  }

  async onDismiss() {
    const modal = await this.getModal();
    return modal.onWillDismiss();
  }

  async cropAndClose(base64Data: string) {
    const imagePath = await this.saveToGallery(base64Data);
    const modal = await this.getModal();
    await modal.dismiss({ imagePath, base64Data });
    this.modal = null;
  }

  async saveToGallery(base64Data: string) {
    let realData = base64Data.split(',')[1];
    let blob = this.b64toBlob(realData, 'image/jpeg');
    let imageName = 'empleado-' + new Date().getTime().toString(16) + '.jpg';

    return new Promise((resolve, reject) => {
      this.file
        .writeFile(this.file.cacheDirectory, imageName, blob)
        .then((res) => {
          console.log('file', res);
          resolve(res.nativeURL);
        })
        .catch((err) => {
          console.error('write file errr ', err);
          reject(err);
        });
    });
  }

  //convert base64 to blob
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
