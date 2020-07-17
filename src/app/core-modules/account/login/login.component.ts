import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModulesService } from 'src/app/modules/modules.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  entity: any = {
    rank: {
      id: ''
    },
    ship: {
      id: ''
    },
    password: ''
  };
  ships: Array<any> = [];
  ranks: Array<any> = [];

  constructor(
    private baseService: BaseService,
    private authService: AuthService,
    private moduleService: ModulesService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getShipsRecords();
    this.getRanksRecords();
  }

  /**
   * Return ships record
   */
  getShipsRecords() {
    this.moduleService.getShipsRecords().subscribe((response) => {
      this.ships = response.details;
    });
  }

  /**
   * Return ranks record
   */
  getRanksRecords() {
    this.moduleService.getRanksDetails().subscribe((response) => {
      this.ranks = response.details;
    });
  }


  /**
   * Login method
   */
  login() {
    this.baseService.login(this.entity).subscribe((response) => {
      this.authService.setUser(response);
      this.authService.saveToken(response.token);
      this.authService.redirectAfterLogin();
    }, err => {
      if (err && err.error) {
        this.toastr.error(err.error.details);
      }
    });
  }
}
