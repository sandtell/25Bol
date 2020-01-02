import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorydetailsPageRoutingModule } from './categorydetails-routing.module';

import { CategorydetailsPage } from './categorydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorydetailsPageRoutingModule
  ],
  declarations: [CategorydetailsPage]
})
export class CategorydetailsPageModule {}
