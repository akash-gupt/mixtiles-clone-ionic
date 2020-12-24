import { Component, OnInit } from '@angular/core';
import { FbGalleryService } from './fb-gallery.service';
import { FbService } from './fb.service';
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

  constructor(
    private fb: FbService,
    private fbGalleryService: FbGalleryService
  ) {}

  ngOnInit() {
    this.paginatePhotos();
  }

  async paginatePhotos(nextToken = this.after) {
    this.loading = true;
    const response = await this.fb.paginatePhotos(nextToken);
    this.fbImages = [...this.fbImages, ...response.data];
    this.after = response?.paging?.cursors?.after;
    this.loading = false;
  }

  async closeGallery() {
    await this.fbGalleryService.close();
  }

  async onSelect(index: number) {
    console.log(index);
    await this.closeGallery();
  }
}
