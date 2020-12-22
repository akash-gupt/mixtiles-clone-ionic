import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File as FileReader } from '@ionic-native/file/ngx';
import { FrameType } from 'src/app/app.constant';

@Component({
  selector: 'app-review-upload-button',
  templateUrl: './review-upload-button.component.html',
  styleUrls: ['./review-upload-button.component.scss'],
})
export class ReviewUploadButtonComponent implements OnInit {
  @Input() frameType: FrameType = 'bold';
  @Output() onChange = new EventEmitter<string>();

  croppedImagePath = null;
  isLoading = false;

  cropOptions: CropOptions = {
    quality: 50,
  };

  constructor(
    public actionSheetController: ActionSheetController,
    private file: FileReader,
    private crop: Crop,
    private camera: Camera
  ) {}

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Choose from Phone',
          icon: 'image-outline',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
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

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.cropImage(imageData);
      },
      (err) => {
        // Handle error
      }
    );
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 }).then(
      (newPath) => {
        this.showCroppedImage(newPath.split('?')[0]);
      },
      (error) => {
        alert('Error cropping image' + JSON.stringify(error));
      }
    );
  }

  async showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(
      (base64) => {
        this.croppedImagePath = base64;
        this.isLoading = false;

        // Emit to parent
        this.onChange.emit(this.croppedImagePath);
      },
      (error) => {
        alert('Error in showing image' + error);
        this.isLoading = false;
      }
    );
  }
}
