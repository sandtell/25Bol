import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
   public pageMode:string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
  ) {
     
  }

  ngOnInit() {
    this.pageMode = this.activatedRoute.snapshot.paramMap.get('pageMode');

    if(this.pageMode === 'Logout'){
      this.authService.logout();
      this.router.navigateByUrl('intro');
    }

  }

}
