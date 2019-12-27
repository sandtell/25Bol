import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public menuCtrl: MenuController,
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  logoutFn(){
    this.authService.logout();
    // this.router.navigateByUrl('login');
    this.router.navigateByUrl('intro');
  }

}
