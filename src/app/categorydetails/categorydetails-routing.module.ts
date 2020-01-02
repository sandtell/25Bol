import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorydetailsPage } from './categorydetails.page';

const routes: Routes = [
  {
    path: '',
    component: CategorydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorydetailsPageRoutingModule {}
