import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
   public pageMode:string = '';
   public apiToken;
   public userEmailID;
   backButtonSubscription; 
   public jsonItems: any =[];
   public noRecord:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private config:ConfigService,
    private router: Router,
    private platform: Platform,
    private storage: Storage,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
  ) {
     
  }

  ngOnInit() {
    this.apiToken = localStorage.getItem('lsApiToken');
    this.userEmailID = localStorage.getItem('lsEmail');
    this.pageMode = this.activatedRoute.snapshot.paramMap.get('pageMode');
    // console.log(this.userID);
    // console.log(this.userEmailID);
    // console.log(this.router.url);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      const activePage = `/list/${this.pageMode}`;
      if(this.router.url === activePage ){
        this.router.navigateByUrl('dashboard');  
      }
    });

     console.log(this.pageMode);

    if(this.pageMode === 'Logout'){      
      localStorage.clear();
      this.storage.clear().then(() => {
        console.log('all keys are cleared');
      });
      this.authService.logout();
      this.router.navigateByUrl('intro');
    }
    
    else if (this.pageMode === 'ContactUs') {
      this.getDataByPageMode('contact_us');
    }
    else if (this.pageMode === 'AboutUs') {
      this.getDataByPageMode('about_us');
    }
  }


 async  getDataByPageMode(pageMode) {    
    const headers = new HttpHeaders().set('Api_Token', this.apiToken).set('User_Email', this.userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'defaultpage' + '/' + pageMode;
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });

    data = this.http.get(url,{ headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItems = result.data; 
        if(result.data.length === 0){
          this.noRecord = true;
        }else{
          this.noRecord = false;
        }

        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
   }


}
