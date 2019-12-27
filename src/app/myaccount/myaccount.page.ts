import { Component, OnInit , OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit, OnDestroy, AfterViewInit {
  backButtonSubscription; 
  constructor(
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() {      
    console.log(this.router.url);
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(this.router.url === '/myaccount' ){
        this.router.navigateByUrl('dashboard');  
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

}
