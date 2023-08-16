import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeepostPage } from './seepost.page';

const routes: Routes = [
  {
    path: '',
    component: SeepostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeepostPageRoutingModule {}
