import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarPPageRoutingModule } from './recuperar-p-routing.module';

import { RecuperarPPage } from './recuperar-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPPageRoutingModule
  ],
  declarations: [RecuperarPPage]
})
export class RecuperarPPageModule {}
