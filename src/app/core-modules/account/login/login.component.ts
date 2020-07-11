import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModulesService } from 'src/app/modules/modules.service';

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
    private authService: AuthService,
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.ships = this.getShipsRecords();
    this.ranks = this.moduleService.getRanksRecords();
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
   * Login method
   */
  login() {
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
