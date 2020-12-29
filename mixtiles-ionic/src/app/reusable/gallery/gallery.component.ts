import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() nextToken: string = null;
  @Input() items: Array<string> = [];
  @Input() loading: boolean = false;
  @Output() onSelect = new EventEmitter<number[]>();
  @Output() onClose = new EventEmitter();
  @Output() loadMore = new EventEmitter<string>();

  selected: number[] = [];

  constructor() {}

  ngOnInit() {}

  toggle(index: number) {
    // onSelect.emit(i)
    if (this.selected.includes(index)) {
      this.unselect(index);
    } else {
      this.selected.push(index);
    }
  }

  unselect(index: number) {
    this.selected = this.selected.filter((o) => o !== index);
  }

  ok() {
    this.onSelect.emit(this.selected);
  }
}
