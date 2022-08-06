import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonPageRoutingModule } from './anon-routing.module';

import { AnonPage } from './anon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnonPageRoutingModule
  ],
  declarations: [AnonPage]
})
export class AnonPageModule {}
