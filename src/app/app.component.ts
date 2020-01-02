import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {   
  public userName:string='';
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'fa fa-home fa-1x',
    },
    {
      title: 'Announcements',
      url: '/announcments',
      icon: 'fa fa-bullhorn fa-1x',
    },
    {
      title: 'Downloads',
      url: '/download',
      icon: 'fa fa-download fa-1x',
    },
    {
      title: 'About Us',
      url: '/list',
      icon: 'fa fa-address-card-o fa-1x',
      pageMode:'AboutUs'
    },
    {
      title: 'Contact Us',
      url: '/list',
      icon: 'fa fa-phone-square fa-1x',
      pageMode:'ContactUs'
    },
    {
      title: 'My Account',
      url: '/myaccount',
      icon: 'fa fa-user fa-1x',
    },
    {
      title: 'Logout',
      url: '/list',
      icon: 'fa fa-sign-out fa-1x',
      pageMode:'Logout'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private authenticationService: AuthenticationService,
    private navController:NavController,
    public alertCtrl :AlertController,
    private toastCtrl: ToastController,
    private network: Network,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#A71E16");
       // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected ☹️');
      this.presentToast('Internet not available  ☹️');
      this.exitFunction('Exit and try again');
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      this.presentToast('Network connected! ☺️ ');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.presentToast('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

      this.authenticationService.authState.subscribe(state => {
        console.log(state);
        // alert(state);
        if (state) {
           this.userName = localStorage.getItem('lsUserName');
          this.navController.navigateRoot(['dashboard']);
        } else {
          // this.navController.navigateRoot(['login']);
          this.navController.navigateRoot(['intro']);
        }
      });

    });
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

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
