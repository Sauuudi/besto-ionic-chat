import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonPage } from './anon.page';

const routes: Routes = [
  {
    path: '',
    component: AnonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonPageRoutingModule {}
