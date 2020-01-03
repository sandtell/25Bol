import { Component } from '@angular/core';
import { Platform, NavController, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from './services/authentication.service';
import { Network } from '@ionic-native/network/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {   
  public userName:string='';

  showLevel1 = null;
  showLevel2 = null;
  showLevel3 = null;
  public appPages;

  // public appPages = [
    
  //   {
  //     sub_category : [
  //       {
  //         category_id : 12,
  //         category_name: "01 BOL GATI 4",
  //       },
  //       {
  //         category_id : 13,
  //         category_name: "02 BOL JAATI 5",
  //       },
  //       {
  //         category_id : 15,
  //         category_name: "03-BOL KAYA",
  //       }
  //     ]
  //   }
  // ];

  public staticMenu = [
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
  ]

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
    public config:ConfigService,
    public http: HttpClient,
  ) {
    this.initializeApp();
  }


  clearLevel() {
    this.showLevel1 = null;
    this.showLevel2 = null;
    this.showLevel3 = null;
  }

  
  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  toggleLevel3(idx: string) {
    if (this.isLevel3Shown(idx)) {
      this.showLevel3 = null;
    } else {
      this.showLevel2 = idx;
      this.showLevel3 = idx;
    }
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };

  isLevel3Shown(idx: string) {
    return this.showLevel3 === idx;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#A71E16");

      this.getSubcategory();

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


  getSubcategory() {    
    let data: Observable<any>;
    let url = this.config.domainURL + 'default_category';
    data = this.http.get(url);
      data.subscribe(result => {
        console.log(result.data[0].sub_category);
        this.appPages =  result.data[0].sub_category;
        console.log(result.data[0].sub_category);
      }, error => {
        console.log(error);       
      });    
   }

}
