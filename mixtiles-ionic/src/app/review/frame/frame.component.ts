import { Component, Input, OnInit } from '@angular/core';
import { FrameType } from 'src/app/app.constant';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  @Input() fileUrl: string;
  @Input() frameType: FrameType = 'bold';

  constructor() {}

  ngOnInit() {}
}
