import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/core/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localService: LocalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.localService.clear();
    this.router.navigate(['login']);
  }
}
