import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbGalleryComponent } from './fb-gallery.component';
import { IonicModule } from '@ionic/angular';
import { FbGalleryService } from './fb-gallery.service';
import { FbService } from './fb.service';
import { GalleryModule } from '../gallery/gallery.module';
import { FbGalleyPipe } from './fb-galley.pipe';

@NgModule({
  declarations: [FbGalleryComponent, FbGalleyPipe],
  imports: [CommonModule, IonicModule, GalleryModule],
  providers: [FbGalleryService, FbService],
})
export class FbGalleryModule {}
