import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-contained-box',
  templateUrl: './contained-box.component.html',
  styleUrls: ['./contained-box.component.css']
})
export class ContainedBoxComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (this.router.url == '/' && !this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    } else if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {
    
  }

}
