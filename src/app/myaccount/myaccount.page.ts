import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription;
  validations_form: FormGroup;
  mobileNo: string;
  public profileDetails: any;
  public isEdit: boolean = true;
  public statesJson: any = [];
  constructor(
    private router: Router,
    private platform: Platform,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public config: ConfigService,
    public loadingCtrl: LoadingController,
    public http: HttpClient,
    public toastController: ToastController,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getProfileData();
    // console.log(this.router.url);
    this.validations_form = this.formBuilder.group({
      user_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{2,30}$')
      ])),
      user_email: new FormControl(''),
      user_mobile: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      address_1: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      address_2: new FormControl(''),
      city: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.validations_form.disable();

  }

  enableForm() {
    this.isEdit = false;
    this.validations_form.enable();
  }

  async  getProfileData() {
    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);
    let data: Observable<any>;
    let url = this.config.domainURL + 'myaccount';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url, { headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        this.profileDetails = result;

        this.statesJson = result.data.states_list;

        console.log(result);
        console.log(result.data.states_list);

        this.validations_form.controls['user_mobile'].setValue(result.data.user_list.user_mobile);
        this.validations_form.controls['user_name'].setValue(result.data.user_list.user_name);

        if (result.data.user_list.address_1 != null) {
          this.validations_form.controls['address_1'].setValue(result.data.user_list.address_1);
        }

        if (result.data.user_list.address_2 != null) {
          this.validations_form.controls['address_2'].setValue(result.data.user_list.address_2);
        }

        if (result.data.user_list.user_email != null) {
          this.validations_form.controls['user_email'].setValue(result.data.user_list.user_email);
        }

        if (result.data.user_list.city != null) {
          this.validations_form.controls['city'].setValue(result.data.user_list.city);
        }

        if (result.data.user_list.state != null) {
          this.validations_form.controls['state'].setValue(result.data.user_list.state);
        }

        if (result.data.user_list.zipcode != null) {
          this.validations_form.controls['zipcode'].setValue(result.data.user_list.zipcode);
        }

        // this.validations_form.controls['user_name'].setValue(result.data.user_list.user_name);


        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }

  validation_messages = {
    user_name: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Number are not allowed' }
    ],
    user_mobile: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    address_1: [
      { type: 'required', message: 'Address 1 is required.' },
    ],
    city: [
      { type: 'required', message: 'City / Town is required.' },
    ],
    state: [
      { type: 'required', message: 'State is required.' },
    ],
    zipcode: [
      { type: 'required', message: 'Zipcode is required.' },
    ]

  };

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (this.router.url === '/myaccount') {
        this.router.navigateByUrl('dashboard');
      }
    });
  }



  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  async onSubmit(values) {

    const apiToken = localStorage.getItem('lsApiToken');
    const userEmailID = localStorage.getItem('lsEmail');
    const headers = new HttpHeaders().set('Api_Token', apiToken).set('User_Email', userEmailID);

    console.log(values);

    let data: any;
    const url = this.config.domainURL + 'myaccount';
    const loading = await this.loadingCtrl.create({
      message: 'Updating User Profile...',
    });
    data = this.http.post(url, values, { headers: headers });
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        if (result.status === "1") {
          this.isEdit = true;
          this.validations_form.disable();
          this.presentToast(result.message);
          loading.dismiss();
        }
        else if (result.status === "0") {
          this.presentToast(result.message);
          loading.dismiss();
        }

        loading.dismiss();
      });
      return loading.present();
    }, error => {
      console.log(error);
      loading.dismiss();
    });

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}
