import { Component, Input, OnInit } from '@angular/core';
import { CropImageService } from '../crop-image.service';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss'],
})
export class CropImageModalComponent implements OnInit {
  @Input() pathImg: string;

  constructor() {}

  ngOnInit() {}
}
