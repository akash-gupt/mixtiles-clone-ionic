import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbGalleryComponent } from './fb-gallery.component';
import { IonicModule } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FbGalleryService } from './fb-gallery.service';
import { FbService } from './fb.service';
import { GalleryModule } from '../gallery/gallery.module';
import { FbGalleyPipe } from './fb-galley.pipe';
import { GalleryModalComponent } from './gallery-modal/gallery-modal.component';

@NgModule({
  declarations: [FbGalleryComponent, FbGalleyPipe, GalleryModalComponent],
  imports: [CommonModule, IonicModule, GalleryModule],
  providers: [FbGalleryService, FbService, File],
})
export class FbGalleryModule {}
