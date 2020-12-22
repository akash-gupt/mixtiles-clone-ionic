import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterButtonType, FrameType } from 'src/app/app.constant';

@Component({
  selector: 'app-review-head',
  templateUrl: './review-head.component.html',
  styleUrls: ['./review-head.component.scss'],
})
export class ReviewHeadComponent implements OnInit {
  @Output() onSelectionChange = new EventEmitter<FrameType>();

  buttons: Array<FilterButtonType> = [
    {
      iconImage: 'assets/icon/boldIcon.png',
      id: 'bold',
      title: 'Bold',
      selected: true,
    },
    {
      iconImage: 'assets/icon/edgeIcon.png',
      id: 'edge',
      title: 'Edge',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {}

  onChange(data) {
    this.buttons = data;
    const selected = this.buttons.find((o) => o.selected === true);
    this.onSelectionChange.emit(selected.id);
  }
}
