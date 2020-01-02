import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ConfigService } from '../services/config.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.page.html',
  styleUrls: ['./categorydetails.page.scss'],
})
export class CategorydetailsPage implements OnInit {

  public categoryID;
  public categoryName: string = '';
  public categoryContent: any = [];
  public previous;
  public previousEnable: boolean = false;
  public next;
  public nextEnable: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    public config: ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.categoryID = this.activatedRoute.snapshot.paramMap.get('categoryID');
    // this.categoryName = this.activatedRoute.snapshot.paramMap.get('categoryName');
    this.getCategoryDataByID(this.categoryID);
  }

  async  getCategoryDataByID(catID) {
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    // console.log(apiToken);
    // console.log(userEmailID);    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'view_content/' + catID;
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url, { headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);

        this.categoryName = result.data.content.category_name;
        this.categoryContent = result.data.content.content;

        if (result.data.nav_page.previous[0] != null) {
          this.previous = result.data.nav_page.previous[0].category_id;
          this.previousEnable = true;
        }else{
          this.previousEnable = false;
        }

        if (result.data.nav_page.next[0] != null) {
          this.next = result.data.nav_page.next[0].category_id;
          this.nextEnable = true;
        }else{
          this.nextEnable = false;
        }

        console.log(this.previous);
        console.log(this.next);

        // console.log(result.data.nav_page.next[0].category_id);

        // console.log(result.data.nav_page.previous[0]);

        // console.log(result.data.nav_page.previous[0].category_id);

        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }


  previousNextCatDetails(id){
    this.getCategoryDataByID(id);
  }


}
