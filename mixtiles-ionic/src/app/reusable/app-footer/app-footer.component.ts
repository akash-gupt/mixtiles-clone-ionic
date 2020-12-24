import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  @Input() title = 'Style Your Photos';
  @Output() onPress: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    console.log('====');
    this.onPress.emit();
  }
}
