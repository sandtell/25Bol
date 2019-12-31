import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
   public pageMode:string = '';
   backButtonSubscription; 
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private platform: Platform,
    private storage: Storage,
  ) {
     
  }

  ngOnInit() {
    console.log(this.router.url);
    this.pageMode = this.activatedRoute.snapshot.paramMap.get('pageMode');

    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      const activePage = `/list/${this.pageMode}`;
      if(this.router.url === activePage ){
        this.router.navigateByUrl('dashboard');  
      }
    });

    if(this.pageMode === 'Logout'){
      this.storage.clear().then(() => {
        console.log('all keys are cleared');
      });
      this.authService.logout();
      this.router.navigateByUrl('intro');
    }
  }

}
