import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(
    private toastCtrl: ToastController,
  ) { }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      showCloseButton : true,
      // color: 'dark',
      // cssClass: "toast-danger",  // global.css
    });
    toast.present();
  }
}
