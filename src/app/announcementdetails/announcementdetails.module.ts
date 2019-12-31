import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncementdetailsPageRoutingModule } from './announcementdetails-routing.module';

import { AnnouncementdetailsPage } from './announcementdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncementdetailsPageRoutingModule
  ],
  declarations: [AnnouncementdetailsPage]
})
export class AnnouncementdetailsPageModule {}
