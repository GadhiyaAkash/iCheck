import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    const publicRoute = route.data.isPublic || false;
    if (!publicRoute && !this.authService.isLoggedIn()) { // If the route is not public and not logged in
      if (!(route.data && route.data.hasError)) {
        this.authService.redirectUrl = url;
      }
      this.router.navigate(['login']);
    }
    return true;
  }

}
