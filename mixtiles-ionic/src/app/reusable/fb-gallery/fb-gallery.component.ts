import { Component, OnInit } from '@angular/core';
import { FbGalleryService } from './fb-gallery.service';
import { FacebookPhotoResponse } from './types';

@Component({
  selector: 'app-fb-gallery',
  templateUrl: './fb-gallery.component.html',
  styleUrls: ['./fb-gallery.component.scss'],
})
export class FbGalleryComponent implements OnInit {
  after = null;
  loading = false;
  fbImages: FacebookPhotoResponse['data'] = [];

  constructor(private fbGalleryService: FbGalleryService) {}

  ngOnInit() {
    this.paginatePhotos();
  }

  async paginatePhotos(nextToken = this.after) {
    this.loading = true;
    const response = await this.fbGalleryService.paginatePhotos(nextToken);
    this.fbImages = [...this.fbImages, ...response.data];
    this.after = response?.paging?.cursors?.after;
    this.loading = false;
  }

  async closeGallery() {
    console.log('clicked closeGallery');
    await this.fbGalleryService.close();
  }

  async onSelect(indexes: number[]) {
    const selectedData = [];

    for (let index = 0; index < indexes.length; index++) {
      selectedData.push(this.fbImages[index]);
    }

    await this.fbGalleryService.selectImagesAndClose(selectedData);
  }
}
