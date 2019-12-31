import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from "@ionic/angular";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { HttpClient } from '@angular/common/http';
import { PasswordValidator } from '../password.validator';
@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.page.html',
  styleUrls: ['./changepwd.page.scss'],
})
export class ChangepwdPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  public showPassword: boolean = true;
  public showConfirmPassword: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private router: Router,
    private config: ConfigService,
    public http: HttpClient, 
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
      matching_passwords: this.matching_passwords_group,

    });
  }

  validation_messages = {
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
 

 

  async onSubmit(values){
    console.log(values);   

    console.log('USER ID =',localStorage.getItem('lsUserID'));
    // console.log('OTP = ',localStorage.getItem('changePWDOTP'));
    
    let changePWDValues = {
      id : localStorage.getItem('lsUserID'),
      new_password : values.matching_passwords.password
    }

    let data: any;
    const url = this.config.domainURL + 'change_password';
    const loading = await this.loadingCtrl.create({
      message: 'Changing Password...',
    });
    data = this.http.post(url,changePWDValues);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);

        

        console.log(result.data.user_id);

       if (result.status === "1") {
          this.router.navigateByUrl('login');
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
    
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
