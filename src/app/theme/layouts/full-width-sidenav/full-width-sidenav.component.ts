import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-full-width-sidenav',
  templateUrl: './full-width-sidenav.component.html',
  styleUrls: ['./full-width-sidenav.component.css']
})
export class FullWidthSidenavComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const publicRoute = this.activeRoute.snapshot.data.isPublic || false;
    if (this.router.url == '/') {
      if (!publicRoute && !this.authService.isLoggedIn()) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['dashboard']);
      }
    }
  }

}
