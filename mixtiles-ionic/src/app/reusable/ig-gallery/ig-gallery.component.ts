import { Component, OnInit } from '@angular/core';
import { IgGalleyService } from './ig-galley.service';
import { IgService } from './ig.service';
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

  constructor(
    private fb: IgService,
    private igGalleryService: IgGalleyService
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
    await this.igGalleryService.close();
  }

  async onSelect(index: number) {
    console.log(index);
    await this.closeGallery();
  }
}
