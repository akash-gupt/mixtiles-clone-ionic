import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';

import { Endpoints, FrameType, SelectImageEvRes } from '../app.constant';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  frameType: FrameType = 'bold';
  selectedImage: SelectImageEvRes = {
    base64: null,
    filePath: null,
    imageName: null,
  };
  loading: HTMLIonLoadingElement;

  constructor(
    private menu: MenuController,
    private alert: AlertController,
    private reviewService: ReviewService,
    public loadingController: LoadingController
  ) {}

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 2000,
    });
  }

  onCheckout() {}

  toggle() {
    this.menu.toggle();
  }

  save(savedFileName: string) {
    if (!this.selectedImage) {
      this.failedAlert();
      return;
    }

    this.reviewService
      .createFile({
        fileName: savedFileName,
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
    this.selectedImage = {
      base64: null,
      filePath: null,
      imageName: null,
    };
  }

  async upload() {
    await this.loading.present();

    const response = await this.reviewService.upload(
      this.selectedImage.filePath,
      this.selectedImage.imageName
    );

    if (response) {
      await this.save(response.filename);
    } else {
      this.failedAlert();
    }

    await this.loading.dismiss();
  }
}
