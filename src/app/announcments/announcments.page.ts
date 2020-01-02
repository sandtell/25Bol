import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-announcments',
  templateUrl: './announcments.page.html',
  styleUrls: ['./announcments.page.scss'],
})
export class AnnouncmentsPage implements OnInit {
  public jsonItems: any =[];
  public noRecord:boolean = false;
  constructor(
    private config:ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  
  ngOnInit() {
    this.getAnnouncmentsData();
  }

  async  getAnnouncmentsData() {   
    
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'announcement';
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
