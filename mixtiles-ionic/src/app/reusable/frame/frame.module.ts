import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FrameComponent],
  imports: [CommonModule, IonicModule],
  exports: [FrameComponent],
})
export class FrameModule {}
