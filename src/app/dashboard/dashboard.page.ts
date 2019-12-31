import { Component, OnInit , OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Platform, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private platform: Platform,
    public alertCtrl :AlertController,
  ) { }

  ngOnInit() {

    console.log(localStorage.getItem('lsApiToken'));

  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(this.router.url === '/dashboard' ){
        this.exitFunction('Are you sure you want to Exit App ?');
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  logoutFn(){
    this.authService.logout();
    this.router.navigateByUrl('intro');
  }

  async exitFunction(msg : string) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
            // console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

}
