import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  @Output() onPress: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
