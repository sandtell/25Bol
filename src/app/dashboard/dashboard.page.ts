import { Component, OnInit , OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Platform, AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 
  dashboardItems:any = [];
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private platform: Platform,
    public alertCtrl :AlertController,
    public config:ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage: Storage,
  ) {
    
   }

  ngOnInit() {
    // console.log(localStorage.getItem('lsApiToken'));
    this.getDashboardList();
  }


  async  getDashboardList() {   
    
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');

    console.log(apiToken);
    console.log(userEmailID);
    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'dashboard';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });

    data = this.http.get(url,{ headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.dashboardItems = result.data.category_list;

        if(result.status === "3") {
          localStorage.clear();
          this.storage.clear().then(() => {
            console.log('all keys are cleared');
          });
          this.authService.logout();
          this.router.navigateByUrl('intro');
        }

        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
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
    localStorage.clear();
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
