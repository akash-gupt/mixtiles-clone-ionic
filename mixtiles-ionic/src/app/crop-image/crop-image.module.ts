import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropComponent } from './crop/crop.component';

import { IonicModule } from '@ionic/angular';

import { CropImagePageRoutingModule } from './crop-image-routing.module';

import { CropImagePage } from './crop-image.page';
import { NgxCroppieModule } from '../reusable/ngx-croppie/ngx-croppie.module';
import { FrameModule } from '../reusable/frame';
import { CropImageService } from './crop-image.service';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropImagePageRoutingModule,
    NgxCroppieModule,
    FrameModule,
  ],
  declarations: [CropImagePage, CropComponent, CropImageModalComponent],
  providers: [CropImageService],
  exports: [CropImageService],
})
export class CropImagePageModule {}
