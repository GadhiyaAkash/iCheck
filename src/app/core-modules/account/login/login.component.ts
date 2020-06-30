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
      { id: 1, name: 'Ship 1' },
      { id: 2, name: 'Ship 2' },
      { id: 3, name: 'Ship 3' }
    ]
  }

  /**
   * Return ranks record
   */
  getRanksRecords() {
    return [
      { id: 1, name: 'Rank 1' },
      { id: 2, name: 'Rank 2' },
      { id: 3, name: 'Rank 3' }
    ]
  }

  /**
   * Login method
   */
  login() {
    console.log("Login form", this.entity);
    
    // this.baseService.post('/login', this.entity).subscribe(() => {
    //   this.authService.redirectAfterLogin();
    // }, err => {
    //   if (err && err.error) {
    //     // this.toastr.error(err.error.message);
    //   }
    // });
  }
}
