import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-announcementdetails',
  templateUrl: './announcementdetails.page.html',
  styleUrls: ['./announcementdetails.page.scss'],
})
export class AnnouncementdetailsPage implements OnInit {
  public jsonItems: any =[];
  public noRecord:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private config:ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    const announceID = this.activatedRoute.snapshot.paramMap.get('announceID');
    console.log(announceID);
    this.getAnnouncmentsDataByID(announceID);
  }

  async  getAnnouncmentsDataByID(announceID) {   
    
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'announcement/' + announceID;
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
