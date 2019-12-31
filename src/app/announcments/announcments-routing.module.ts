import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncmentsPage } from './announcments.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncmentsPageRoutingModule {}
