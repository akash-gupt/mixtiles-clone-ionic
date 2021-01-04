import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';
import { ReviewHeadComponent } from './review-head/review-head.component';
import { ReviewBodyComponent } from './review-body/review-body.component';
import { FilterButtonsModule } from '../reusable/filter-buttons';
import { ReviewUploadButtonComponent } from './review-upload-button';
import { CropComponent } from './crop/crop.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReviewPageRoutingModule,
    FilterButtonsModule,
    PinchZoomModule,
  ],
  declarations: [
    ReviewPage,
    ReviewHeadComponent,
    ReviewBodyComponent,
    ReviewUploadButtonComponent,
    CropComponent,
  ],
})
export class ReviewPageModule {}
