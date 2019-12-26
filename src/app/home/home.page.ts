import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  logoutFn(){
    this.authService.logout();
    // this.router.navigateByUrl('login');
    this.router.navigateByUrl('intro');
  }

}
