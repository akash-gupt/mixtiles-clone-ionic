import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrameType } from 'src/app/app.constant';
import { NgxCropOptions } from 'src/app/reusable/ngx-croppie/ngx-croppie.component';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
})
export class CropComponent implements OnInit {
  options: NgxCropOptions = {
    boundary: { width: 263, height: 263 },
    viewport: { height: 263, width: 263 },
    enableZoom: true,
  };

  @Input() imageUrl: string;
  @Input() frame: FrameType;
  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
