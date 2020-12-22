import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FrameType } from '../app.constant';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  frameType: FrameType = 'bold';
  selectedImage: string;

  constructor(private menu: MenuController) {}

  ngOnInit() {}

  onCheckout() {}

  toggle() {
    this.menu.toggle();
  }
}
