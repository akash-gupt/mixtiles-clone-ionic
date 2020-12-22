import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';
import { ReviewHeadComponent } from './review-head/review-head.component';
import { ReviewBodyComponent } from './review-body/review-body.component';
import { FilterButtonsModule } from '../reusable/filter-buttons';
import { ReviewUploadButtonComponent } from './review-upload-button';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReviewPageRoutingModule,
    FilterButtonsModule,
  ],
  declarations: [
    ReviewPage,
    ReviewHeadComponent,
    ReviewBodyComponent,
    ReviewUploadButtonComponent,
  ],
})
export class ReviewPageModule {}
