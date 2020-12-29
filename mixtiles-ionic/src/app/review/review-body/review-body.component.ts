import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FrameType, SelectImageEvRes } from 'src/app/app.constant';

@Component({
  selector: 'app-review-body',
  templateUrl: './review-body.component.html',
  styleUrls: ['./review-body.component.scss'],
})
export class ReviewBodyComponent implements OnInit {
  @Input() croppedImagePath: string = null;
  @Input() files: SelectImageEvRes[] = [];
  @Input() frameType: FrameType = 'bold';
  @Output() onChange = new EventEmitter<SelectImageEvRes>();
  @Output() onChangeFiles = new EventEmitter<SelectImageEvRes[]>();

  constructor() {}

  ngOnInit() {}
}
