import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public redirectUrl: string;//to handle redirect after login
  
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private localService: LocalService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return this.token && this.user ? true : false;
  }

  public get user() {
    return this.localService.get('users');
  }

  setUser(user) {
    this.localService.set('users', user);
    this.currentUserSubject.next(user);
  }

  public get token() {
    return this.localService.get('token');
  }

  saveToken(token: String) {
    this.localService.set('token', token);
  }

  redirectAfterLogin() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    } else {
      this.router.navigate(['dashboard']);
    }
  }

}
