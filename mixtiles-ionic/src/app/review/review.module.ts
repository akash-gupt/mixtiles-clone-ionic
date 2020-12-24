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
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FbGalleryModule } from '../reusable/fb-gallery/fb-gallery.module';
import { IgGalleryModule } from '../reusable/ig-gallery/ig-gallery.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReviewPageRoutingModule,
    FilterButtonsModule,
    AppFooterModule,
    AppMenuModule,
    FbGalleryModule,
    IgGalleryModule,
  ],
  declarations: [
    ReviewPage,
    ReviewHeadComponent,
    ReviewBodyComponent,
    FrameComponent,
    ReviewUploadButtonComponent,
  ],
  providers: [ReviewService, FileTransfer],
})
export class ReviewPageModule {}
