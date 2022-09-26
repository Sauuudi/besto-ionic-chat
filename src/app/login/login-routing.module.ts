import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'anon',
    loadChildren: () =>
      import('./anon/anon.module').then((m) => m.AnonPageModule),
  },
  {
    path: 'mail',
    loadChildren: () =>
      import('./mail/mail.module').then((m) => m.MailPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
