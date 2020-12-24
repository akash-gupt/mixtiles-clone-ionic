import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgGalleryComponent } from './ig-gallery.component';
import { IgGalleyService } from './ig-galley.service';
import { GalleryModule } from '../gallery/gallery.module';
import { IonicModule } from '@ionic/angular';
import { IgGalleyPipe } from './ig-galley.pipe';

@NgModule({
  declarations: [IgGalleryComponent, IgGalleyPipe],
  imports: [CommonModule, IonicModule, GalleryModule],
  providers: [IgGalleyService],
})
export class IgGalleryModule {}
