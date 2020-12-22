import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import {
  ImagePicker,
  ImagePickerOptions,
} from '@ionic-native/image-picker/ngx';
import { File as FileReader } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-review-upload-button',
  templateUrl: './review-upload-button.component.html',
  styleUrls: ['./review-upload-button.component.scss'],
})
export class ReviewUploadButtonComponent implements OnInit {
  croppedImagePath = '';
  isLoading = false;

  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    // quality: 50,
  };

  cropOptions: CropOptions = {
    quality: 50,
  };

  constructor(
    public actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
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
      },
      (error) => {
        alert('Error in showing image' + error);
        this.isLoading = false;
      }
    );
  }

  // pickImage() {
  //   this.imagePicker.getPictures(this.imagePickerOptions).then(
  //     (results) => {
  //       for (var i = 0; i < results.length; i++) {
  //         this.cropImage(results[i]);
  //       }
  //     },
  //     (err) => {
  //       alert(err);
  //     }
  //   );
  // }

  // cropImage(imgPath) {
  //   console.log('cropping ', imgPath);
  //   this.crop.crop(imgPath, this.cropOptions).then(
  //     async (newPath) => {
  //       console.log('newPath', newPath);
  //       this.showCroppedImage(newPath.split('?')[0]);
  //     },
  //     (error) => {
  //       console.error('Error cropping image' + error);
  //     }
  //   );
  // }

  // async showCroppedImage(ImagePath) {
  //   this.croppedImagePath = ImagePath;
  //   this.isLoading = true;
  //   var copyPath = ImagePath;
  //   var splitPath = copyPath.split('/');
  //   var imageName = splitPath[splitPath.length - 1];
  //   var filePath = ImagePath.split(imageName)[0];

  //   console.log('filePath', filePath);
  //   console.log('imageName', imageName);

  //   try {
  //     this.file
  //       .readAsDataURL(filePath, imageName)
  //       .then((base64) => {
  //         this.croppedImagePath = base64;
  //         this.isLoading = false;
  //         console.log('croppedImagePath', this.croppedImagePath);
  //       })
  //       .catch((err) => {
  //         console.error('Error showing image' + err);
  //         this.isLoading = false;
  //       });
  //   } catch (error) {
  //     console.error('Error showing image', error);
  //   }
  // }
}
