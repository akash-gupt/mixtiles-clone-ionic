import { Component, OnInit } from '@angular/core';
import { FilterButtonType } from 'src/app/reusable/filter-buttons';

@Component({
  selector: 'app-review-head',
  templateUrl: './review-head.component.html',
  styleUrls: ['./review-head.component.scss'],
})
export class ReviewHeadComponent implements OnInit {
  buttons: Array<FilterButtonType> = [
    {
      iconImage: 'assets/icon/boldIcon.png',
      index: 0,
      title: 'Bold',
      selected: true,
    },
    {
      iconImage: 'assets/icon/edgeIcon.png',
      index: 1,
      title: 'Edge',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {}

  onChange(data) {
    this.buttons = data;
  }
}
