import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { ConfigService } from '../services/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { ToastsService } from '../services/toasts.service';
@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  public jsonItems: any =[];
  public noRecord:boolean = false;
  // fileTransfer: FileTransferObject = this.transfer.create();
  private fileTransfer: FileTransferObject; 
  constructor(
   //  private androidPermissions: AndroidPermissions,
    public config:ConfigService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private file: File,
    private transfer: FileTransfer,
    private toastCtrl : ToastsService,
    private downloader: Downloader
  ) { }

   
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getDownloadData();
  }

  async  getDownloadData() {     
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');    
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'download';
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


  //  async downloadFile(url) {
  //   await this.fileTransfer.download(url, this.file.externalRootDirectory + '/Download/' + "abc.jpg");
  // }
  

  // getPermission(fileURL) {
  //   this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  //     .then(status => {
  //       if (status.hasPermission) {
  //         this.downloadFile(fileURL);
  //       } 
  //       else {
  //         this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  //           .then(status => {
  //             if(status.hasPermission) {
  //               this.downloadFile(fileURL);
  //             }
  //           });
  //       }
  //     });
  // }
  

   downloadFile(url) { 
    const fileTransfer: FileTransferObject = this.transfer.create();
    const fullURL = this.config.assetsURL + url;

    const fileType = fullURL.split('/').pop();

    const request: DownloadRequest = {
      uri: fullURL,
      title: fileType,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Download',
          subPath: fileType
      }
  };

  
  this.downloader.download(request).then((location: string) => this.toastCtrl.presentToast('Downloaded at:'+location))
              .catch((error: any) => alert('error' + error));



    // alert(fullURL);
    // alert(fileType);

    // fileTransfer.download(fullURL, this.file.externalRootDirectory + '/Download/' + fileType).then((entry) => {
    //   // alert('71 =' + entry.toURL());
    //   this.presentToast('download complete');
    //   console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   alert('74' + error);
    //   alert('75' + JSON.stringify(error));
    //   // handle error
    // });
   }
 

}
