import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyaccountPageRoutingModule } from './myaccount-routing.module';
import { MyaccountPage } from './myaccount.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MyaccountPageRoutingModule
  ],
  declarations: [MyaccountPage]
})
export class MyaccountPageModule {}
