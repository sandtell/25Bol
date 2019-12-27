import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  logoutFn(){
    this.authService.logout();
    this.router.navigateByUrl('intro');
  }

}
