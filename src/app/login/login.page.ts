import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  loginFn(){
    this.authService.login();
    this.router.navigateByUrl('home');
  }

}
