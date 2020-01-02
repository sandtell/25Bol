import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { ConfigService } from '../services/config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public categoryID;
  public categoryName: string = '';
  public categoryListJson :any = [];
  public content:string='';
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public menuCtrl: MenuController,
    private activatedRoute: ActivatedRoute,
    public config:ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
  ) { }


  ngOnInit() {
    this.categoryID = this.activatedRoute.snapshot.paramMap.get('categoryID');
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('categoryName');
    this.getCategoryDataByID(this.categoryID);    
  }

  async  getCategoryDataByID(catID) {    
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    // console.log(apiToken);
    // console.log(userEmailID);    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'dashboard/' + catID;
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url,{ headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        if(result.data.length != 0) {
          this.content = result.data.parent_page.content;
          this.categoryListJson = result.data.category_list;
        }
        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
   }



  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  logoutFn() {
    localStorage.clear();
    this.authService.logout();
    // this.router.navigateByUrl('login');
    this.router.navigateByUrl('intro');
  }

}
