import { Component, OnInit , OnDestroy, AfterViewInit  } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit , OnDestroy, AfterViewInit  {
  backButtonSubscription; 
  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private platform: Platform,
    public alertCtrl :AlertController,
  ) {
   }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(this.router.url === '/intro' || this.router.url === '/' ){
        this.exitFunction('Are you sure you want to Exit App ?');
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
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
