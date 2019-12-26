import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  public showPassword: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      mobileNo : new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),     
    });
  }

  validation_messages = {
    mobileNo : [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],
    
  };

  async onSubmit(values){
    console.log(values);
  }

  loginFn(){
    this.authService.login();
    this.router.navigateByUrl('home');
  }

  navigationToPage(page){
    this.router.navigateByUrl(page);
  }

  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

}
