import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';
import { ReviewHeadComponent } from './review-head/review-head.component';
import { ReviewBodyComponent } from './review-body/review-body.component';
import { FilterButtonsModule } from '../reusable/filter-buttons';
import { ReviewUploadButtonComponent } from './review-upload-button';
import { FrameComponent } from './frame/frame.component';
import { AppFooterModule } from '../reusable/app-footer';
import { AppMenuModule } from '../reusable/app-menu/app-menu.module';
import { ReviewService } from './review.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReviewPageRoutingModule,
    FilterButtonsModule,
    AppFooterModule,
    AppMenuModule,
  ],
  declarations: [
    ReviewPage,
    ReviewHeadComponent,
    ReviewBodyComponent,
    FrameComponent,
    ReviewUploadButtonComponent,
  ],
  providers: [ReviewService],
})
export class ReviewPageModule {}
