import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { GalleryImageComponent } from './gallery-image/gallery-image.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GalleryComponent, GalleryImageComponent],
  imports: [CommonModule, IonicModule],
  exports: [GalleryComponent],
})
export class GalleryModule {}
