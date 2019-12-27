import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotpwdPageRoutingModule } from './forgotpwd-routing.module';
import { ForgotpwdPage } from './forgotpwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotpwdPageRoutingModule
  ],
  declarations: [ForgotpwdPage]
})
export class ForgotpwdPageModule {}
