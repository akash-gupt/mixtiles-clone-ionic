import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File as FileReader } from '@ionic-native/file/ngx';
import { FrameType, SelectImageEvRes } from 'src/app/app.constant';
import { FbGalleryService } from 'src/app/reusable/fb-gallery/fb-gallery.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Router } from '@angular/router';
import { CropImagePage } from 'src/app/crop-image/crop-image.page';
import { CropImageService } from 'src/app/crop-image/crop-image.service';

@Component({
  selector: 'app-review-upload-button',
  templateUrl: './review-upload-button.component.html',
  styleUrls: ['./review-upload-button.component.scss'],
})
export class ReviewUploadButtonComponent implements OnInit {
  @Input() frameType: FrameType = 'bold';
  @Input() croppedImagePath: string = null;
  @Input() files: SelectImageEvRes[] = [];
  @Output() onChange = new EventEmitter<SelectImageEvRes>();
  @Output() onChangeFiles = new EventEmitter<SelectImageEvRes[]>();

  isLoading = false;

  cropOptions: CropOptions = {
    quality: 50,
  };

  constructor(
    public actionSheetController: ActionSheetController,
    private file: FileReader,
    private crop: Crop,
    private camera: Camera,
    private fbGalleryService: FbGalleryService,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private router: Router,
    private cropImageService: CropImageService
  ) {}

  ngOnInit() {}

  async presentUploadSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Choose from Phone',
          icon: 'image-outline',
          handler: () => {
            this.pickImage();
          },
        },
        {
          text: 'Import from Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.fbGalleryService.open().then(() => {
              this.fbGalleryService.onDismiss().then((response) => {
                this.handleFbImages(response.data?.imagePaths);
              });
            });
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async presentCropSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Crop',
          icon: 'crop-outline',
          handler: async () => {
            const imagePath = this.files[index].filePath;
            const { base64, imageName } = await this.getBase64(imagePath);

            this.cropImageService.open(base64, this.frameType).then(() => {
              this.cropImageService.onDismiss().then((response) => {
                if (response.data?.imagePath && response.data?.base64Data) {
                  this.files[index] = {
                    base64: response.data?.base64Data,
                    filePath: response.data?.imagePath,
                    imageName: imageName,
                  };

                  this.onChangeFiles.emit(this.files);
                }
              });
            });

            // this.cropImage(base64);

            // const imagePath = this.files[index].filePath;
            // const croppedPath: string = await this.getCroppedImage(imagePath);
            // const { base64, imageName } = await this.getBase64(croppedPath);

            // this.files[index] = {
            //   base64: base64,
            //   filePath: croppedPath,
            //   imageName: imageName,
            // };

            // this.onChangeFiles.emit(this.files);
          },
        },
        {
          text: 'Remove',
          icon: 'trash-outline',
          handler: () => {
            this.files.splice(index, 1);
            this.onChangeFiles.emit(this.files);
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async handleFbImages(imagePaths: []) {
    const newImages: SelectImageEvRes[] = [];
    for (var i = 0; i < imagePaths.length; i++) {
      try {
        const { base64, imageName } = await this.getBase64(imagePaths[i]);
        newImages.push({
          base64: base64,
          filePath: imagePaths[i],
          imageName: imageName,
        });
      } catch (error) {
        alert(`error in handleFbImages ${JSON.stringify(imagePaths)} `);
      }
    }

    this.onChangeFiles.emit([...this.files, ...newImages]);
  }

  pickImage() {
    this.imagePicker
      .getPictures({
        allow_video: false,
        outputType: 0,
      })
      .then(async (results) => {
        const newImages: SelectImageEvRes[] = [];
        for (var i = 0; i < results.length; i++) {
          const { base64, imageName } = await this.getBase64(results[i]);

          newImages.push({
            base64: base64,
            filePath: results[i],
            imageName: imageName,
          });
        }

        this.onChangeFiles.emit([...this.files, ...newImages]);
      });
  }

  getCroppedImage(fileUri: string): Promise<string> {
    let fixedFileUrl = fileUri;

    const isAndroid = this.platform.is('android');

    if (!fixedFileUrl.includes('file://') && isAndroid) {
      fixedFileUrl = `file://${fixedFileUrl}`;
    }

    return new Promise((resolve) => {
      this.crop
        .crop(fixedFileUrl, { quality: 50, targetWidth: -1, targetHeight: -1 })
        .then(
          (newPath) => {
            return resolve(newPath.split('?')[0]);
          },
          (error) => {
            alert('Error cropping image' + JSON.stringify(error));
          }
        );
    });
  }

  async getBase64(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    if (!filePath.includes('file://')) {
      filePath = `file://${filePath}`;
    }

    const base64 = await this.file.readAsDataURL(filePath, imageName);
    return { base64, imageName };
  }
}
