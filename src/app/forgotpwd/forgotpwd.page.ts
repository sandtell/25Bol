import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ToastsService } from '../services/toasts.service';
@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.page.html',
  styleUrls: ['./forgotpwd.page.scss'],
})
export class ForgotpwdPage implements OnInit {

  validations_form: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private config :ConfigService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastController: ToastsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  validation_messages = {     
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ] 
  };

  async onSubmit(values){
    console.log(values);
    let data: any;
    const url = this.config.domainURL + 'forgot_password';
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP ...',
    });
    data = this.http.post(url,values);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        if (result.status === "1") {

          localStorage.setItem('lsUserID',result.data[0].user_id);
          localStorage.setItem('lsUserName',result.data[0].user_name);
          localStorage.setItem('lsEmail',result.data[0].user_email);
          localStorage.setItem('lsMobileNo',result.data[0].user_mobile);
          localStorage.setItem('lsIsVerified',result.data[0].isVerified);
          localStorage.setItem('lsOTP',result.data[0].OTP);
          localStorage.setItem('lsApiToken',result.data[0].api_token);

          localStorage.setItem('lsChangePwd','true');

          this.router.navigateByUrl('otp');
          this.toastController.presentToast(result.message);
          loading.dismiss();
        }
        else if (result.status === "0") {
          this.toastController.presentToast(result.message);
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
 

}
