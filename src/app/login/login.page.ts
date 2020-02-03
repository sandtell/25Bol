import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  public showPassword: boolean = true;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private config: ConfigService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastController: ToastsService,
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],

  };

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }


  async onSubmit(values) {
    let data: any;
    const url = this.config.domainURL + 'login';
    const loading = await this.loadingCtrl.create({
      message: 'Verifying User ...',
    });
    data = this.http.post(url, values);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);

        localStorage.setItem('lsUserID',result.data[0].user_id);
        localStorage.setItem('lsUserName',result.data[0].user_name);
        localStorage.setItem('lsEmail',result.data[0].user_email);
        localStorage.setItem('lsMobileNo',result.data[0].user_mobile);
        localStorage.setItem('lsIsVerified',result.data[0].isVerified);
        localStorage.setItem('lsOTP',result.data[0].OTP);
        localStorage.setItem('lsApiToken',result.data[0].api_token);       

        if (result.status === "1" && result.data[0].isVerified == 1) {
          this.authService.login();
          this.router.navigateByUrl('dashboard');
          this.toastController.presentToast(result.message);
          loading.dismiss();
        }
        else if (result.status === "1" && result.data[0].isVerified == 0) {
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
