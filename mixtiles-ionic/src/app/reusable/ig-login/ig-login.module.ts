import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgLoginComponent } from './ig-login.component';
import { IgLoginService } from './ig-login.service';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [IgLoginComponent],
  imports: [CommonModule, IonicModule],
  providers: [IgLoginService],
})
export class IgLoginModule {}
