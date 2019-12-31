import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncementdetailsPage } from './announcementdetails.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncementdetailsPageRoutingModule {}
