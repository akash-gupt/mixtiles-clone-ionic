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
  @Output() onSelect = new EventEmitter<number>();
  @Output() onClose = new EventEmitter();
  @Output() loadMore = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
