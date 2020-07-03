import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  entity: any = {
    ship_id: '',
    rank_id: '',
    password: ''
  };
  ships: Array<any> = [];
  ranks: Array<any> = [];

  constructor(
    private baseService: BaseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.ships = this.getShipsRecords();
    this.ranks = this.getRanksRecords();
  }

  /**
   * Return ships record
   */
  getShipsRecords() {
    return [
      { id: 1, name: 'MV Alexia' },
      { id: 2, name: 'USS Alderamin (AK-116)' },
      { id: 3, name: 'USS Ara (AK-136)' }
    ]
  }

  /**
   * Return ranks record
   */
  getRanksRecords() {
    return [
      { id: 1, name: 'Lieutenant General' },
      { id: 2, name: 'Major General' },
      { id: 3, name: 'Brigadier' }
    ]
  }

  /**
   * Login method
   */
  login() {
    console.log("Login form", this.entity);
    this.baseService.login('/login', this.entity);

    // this.baseService.login('/login', this.entity).subscribe(() => {
      //   this.authService.redirectAfterLogin();
    // }, err => {
    //   if (err && err.error) {
    //     // this.toastr.error(err.error.message);
    //   }
    // });
  }
}
