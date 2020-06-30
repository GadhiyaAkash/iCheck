import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private authService: AuthService
  ) { }

  login(URL:any, params:any) {
    this.authService.setUser(params);
    this.authService.redirectAfterLogin();
  }
}
