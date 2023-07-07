import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuapartadosPageRoutingModule } from './menuapartados-routing.module';

import { MenuapartadosPage } from './menuapartados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuapartadosPageRoutingModule
  ],
  declarations: [MenuapartadosPage]
})
export class MenuapartadosPageModule {}
