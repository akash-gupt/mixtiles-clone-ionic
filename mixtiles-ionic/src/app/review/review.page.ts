import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { Endpoints, FrameType } from '../app.constant';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  frameType: FrameType = 'bold';
  selectedImage: string;

  constructor(
    private transfer: FileTransfer,
    private menu: MenuController,
    private alert: AlertController,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {}

  onCheckout() {}

  toggle() {
    this.menu.toggle();
  }

  save() {
    if (!this.selectedImage) {
      this.failedAlert();
      return;
    }

    this.reviewService
      .createFile({
        file: String(this.selectedImage),
        frameType: this.frameType,
      })
      .then((success) => {
        if (success) {
          this.reset();
          this.successAlert();
        } else {
          this.failedAlert();
        }
      });
  }

  async successAlert() {
    const success = await this.alert.create({
      message: 'File added successfully',
    });

    success.present();
  }

  async failedAlert() {
    const failed = await this.alert.create({
      message: 'File added failed',
    });
    await failed.present();
  }

  reset() {
    this.frameType = 'bold';
    this.selectedImage = null;
  }

  upload() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {},
    };

    fileTransfer.upload('<file path>', Endpoints.UPLOAD_FILE, options).then(
      (data) => {
        // success
      },
      (err) => {
        // error
      }
    );
  }
}
