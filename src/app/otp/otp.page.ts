import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  validations_form: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config :ConfigService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private authService: AuthenticationService,
    ) { }

  ngOnInit() {

     console.log(localStorage.getItem('lsUserID'));
    // console.log(localStorage.getItem('lsUserName'));
     console.log(localStorage.getItem('lsOTP'));

    this.validations_form = this.formBuilder.group({
      otp : new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]))
    });
  }

  validation_messages = {     
    otp : [
      { type: 'required', message: 'OTP is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 6' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 6' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],     
  };

  async onSubmit(values) {
    const userID = localStorage.getItem('lsUserID');
    const otp = localStorage.getItem('lsOTP');
    // console.log('otp = ', otp);
    let data: any;
    const url = this.config.domainURL + 'OTP/' + userID + '/' + values.otp;
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        if (result.status === "1") {
          this.authService.login();
          this.router.navigateByUrl('dashboard');
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
    this.validations_form.reset();
    console.log(values);
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


}
