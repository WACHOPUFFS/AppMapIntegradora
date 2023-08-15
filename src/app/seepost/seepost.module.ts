import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeepostPageRoutingModule } from './seepost-routing.module';

import { SeepostPage } from './seepost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeepostPageRoutingModule
  ],
  declarations: [SeepostPage]
})
export class SeepostPageModule {}
