import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AppFooterComponent],
  imports: [SharedModule],
  exports: [AppFooterComponent],
})
export class AppFooterModule {}
