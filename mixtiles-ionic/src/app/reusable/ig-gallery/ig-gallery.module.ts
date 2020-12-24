import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgGalleryComponent } from './ig-gallery.component';
import { IgGalleyService } from './ig-galley.service';
import { GalleryModule } from '../gallery/gallery.module';
import { IonicModule } from '@ionic/angular';
import { IgGalleyPipe } from './ig-galley.pipe';
import { IgGalleryModalComponent } from './ig-gallery-modal/ig-gallery-modal.component';
import { IgService } from './ig.service';
// import { Oauth, OauthCordova } from 'ionic-cordova-oauth';

@NgModule({
  declarations: [IgGalleryComponent, IgGalleyPipe, IgGalleryModalComponent],
  imports: [CommonModule, IonicModule, GalleryModule],
  providers: [
    IgGalleyService,
    IgService,

    // { provide: Oauth, useClass: OauthCordova }
  ],
})
export class IgGalleryModule {}
