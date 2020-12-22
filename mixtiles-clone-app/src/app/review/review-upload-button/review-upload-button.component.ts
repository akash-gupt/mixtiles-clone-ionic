import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-review-upload-button',
  templateUrl: './review-upload-button.component.html',
  styleUrls: ['./review-upload-button.component.scss'],
})
export class ReviewUploadButtonComponent implements OnInit {
  constructor(
    public actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker
  ) {}

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Choose from Phone',
          icon: 'image-outline',
          handler: this.onPickImage,
        },
        {
          text: 'Import from Facebook',
          icon: 'logo-facebook',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Import from Instagram',
          icon: 'logo-instagram',
          handler: () => {
            console.log('Play clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  private onPickImage() {
    this.imagePicker
      .getPictures({
        allow_video: false,
        maximumImagesCount: 1,
      })
      .then(
        (results) => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        },
        (err) => {}
      );
  }
}
