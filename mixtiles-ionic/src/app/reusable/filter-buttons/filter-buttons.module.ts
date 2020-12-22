import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonsComponent } from './filter-buttons.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FilterButtonsComponent],
  imports: [CommonModule, IonicModule],
  exports: [FilterButtonsComponent],
})
export class FilterButtonsModule {}
