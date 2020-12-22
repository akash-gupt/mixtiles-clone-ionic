import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppMenuComponent } from './app-menu.component';

@NgModule({
  declarations: [AppMenuComponent],
  imports: [CommonModule, IonicModule],
  exports: [AppMenuComponent],
})
export class AppMenuModule {}
