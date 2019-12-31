import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncmentsPageRoutingModule } from './announcments-routing.module';

import { AnnouncmentsPage } from './announcments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncmentsPageRoutingModule
  ],
  declarations: [AnnouncmentsPage]
})
export class AnnouncmentsPageModule {}
