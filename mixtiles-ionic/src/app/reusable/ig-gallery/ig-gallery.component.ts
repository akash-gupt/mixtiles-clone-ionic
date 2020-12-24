import { Component, OnInit } from '@angular/core';
import { IgGalleyService } from './ig-galley.service';
import { FacebookPhotoResponse } from './types';

@Component({
  selector: 'app-ig-gallery',
  templateUrl: './ig-gallery.component.html',
  styleUrls: ['./ig-gallery.component.scss'],
})
export class IgGalleryComponent implements OnInit {
  after = null;
  loading = false;
  igImages: FacebookPhotoResponse['data'] = [];

  constructor(private igGalleryService: IgGalleyService) {}

  ngOnInit() {
    // this.paginatePhotos();
  }

  async paginatePhotos(nextToken = this.after) {
    this.loading = true;
    const response = await this.igGalleryService.paginatePhotos(nextToken);
    this.igImages = [...this.igImages, ...response.data];
    this.after = response?.paging?.cursors?.after;
    this.loading = false;
  }

  async closeGallery() {
    await this.igGalleryService.close();
  }

  async onSelect(index: number) {
    console.log(index);
    await this.closeGallery();
  }
}
