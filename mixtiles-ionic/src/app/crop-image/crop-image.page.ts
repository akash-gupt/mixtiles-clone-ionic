import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrameType } from '../app.constant';
import { CropImageService } from './crop-image.service';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.page.html',
  styleUrls: ['./crop-image.page.scss'],
})
export class CropImagePage implements OnInit {
  @Input() pathImg: string;
  @Input() frame: FrameType;

  changedBase64: string;

  constructor(private cropImageService: CropImageService) {}

  ngOnInit() {}

  async close() {
    await this.cropImageService.close();
  }

  change(base64Data: string) {
    this.changedBase64 = base64Data;
  }

  async done() {
    await this.cropImageService.cropAndClose(this.changedBase64);
  }
}
