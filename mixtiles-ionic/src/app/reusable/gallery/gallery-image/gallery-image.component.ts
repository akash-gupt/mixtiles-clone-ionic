import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
})
export class GalleryImageComponent implements OnInit {
  @Input() imageUrl: string;
  @Output() onSelect = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
