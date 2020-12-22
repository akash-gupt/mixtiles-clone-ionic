import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterButtonType } from './types';

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  styleUrls: ['./filter-buttons.component.scss'],
})
export class FilterButtonsComponent implements OnInit {
  @Input('data') data: FilterButtonType[] = [];
  @Output() onChangeValue: EventEmitter<
    FilterButtonType[]
  > = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(index: number) {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      element.selected = false;
    }

    this.data[index].selected = true;
    this.onChangeValue.emit(this.data);
  }
}
