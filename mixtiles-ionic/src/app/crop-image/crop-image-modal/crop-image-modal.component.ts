import { Component, Input, OnInit } from '@angular/core';
import { FrameType } from 'src/app/app.constant';
import { CropImageService } from '../crop-image.service';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss'],
})
export class CropImageModalComponent implements OnInit {
  @Input() pathImg: string;
  @Input() frame: FrameType;

  constructor() {}

  ngOnInit() {}
}
