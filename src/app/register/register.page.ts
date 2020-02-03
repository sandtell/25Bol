import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController, AlertController } from "@ionic/angular";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { HttpClient } from '@angular/common/http';
import { PasswordValidator } from '../password.validator';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastsService } from '../services/toasts.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  public showPassword: boolean = true;
  public showConfirmPassword: boolean = true;
  constructor(
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastController: ToastsService,
    public alertCtrl: AlertController,
    private router: Router,
    private config: ConfigService,
    public http: HttpClient,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]{2,30}$')
        // Validators.pattern('^[a-zA-Z]+$')
      ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      mobileNo: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      matching_passwords: this.matching_passwords_group,

    });
  }

  validation_messages = {
    fullName: [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern', message: 'Number are not allowed' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    mobileNo: [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      // { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };

  

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  onConfirmPasswordToggle(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
 


  openExternalURL() {
    this.iab.create('http://sandtell.com/', '_system');
  }
  

  async onSubmit(values){
    console.log(values);

    let signupValues = {
      username : values.fullName,
      email : values.email,
      mobileNo : values.mobileNo,
      password : values.matching_passwords.password
    }

    let data: any;
    const url = this.config.domainURL + 'signup';
    const loading = await this.loadingCtrl.create({
      message: 'Creating New User...',
    });
    data = this.http.post(url,signupValues);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);

        

        console.log(result.data.user_id);

       if (result.status === "1" && result.data.isVerified === 0) {


        localStorage.setItem('lsUserID',result.data.user_id);
        localStorage.setItem('lsUserName',result.data.user_name);
        localStorage.setItem('lsEmail',result.data.user_email);
        localStorage.setItem('lsMobileNo',result.data.user_mobile);
        localStorage.setItem('lsIsVerified',result.data.isVerified);
        localStorage.setItem('lsOTP',result.data.OTP);

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
  }


 

}
