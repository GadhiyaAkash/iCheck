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

  /**
   * get Icheck Summary
   */
  public get IcheckSummariesList() {
    return [
      {id: 1, image: 'https://via.placeholder.com/150', title: 'Pre-PSC', description: 'Lorem ipsum text', active: true},
      {id: 2, image: 'https://via.placeholder.com/150', title: 'Quarterly Inspection', description: 'Lorem ipsum text', active: false},
      {id: 3, image: 'https://via.placeholder.com/150', title: 'Pre-vetting', description: 'Lorem ipsum text', active: false},
      {id: 4, image: 'https://via.placeholder.com/150', title: 'Pre-CDI', description: 'Lorem ipsum text', active: false},
      {id: 5, image: 'https://via.placeholder.com/150', title: 'Audit', description: 'Lorem ipsum text', active: false},
    ]
  }

  /**
   * get Icheck Summary Inspection List
   */
  public get IcheckInspectionList() {
    return [
      {id: 1, title: 'Pre-PSC', description: 'Lorem ipsum text', active: true},
      {id: 2, title: 'Quarterly Inspection', description: 'Lorem ipsum text', active: false},
      {id: 3, title: 'Pre-vetting', description: 'Lorem ipsum text', active: false},
      {id: 4, title: 'Pre-CDI', description: 'Lorem ipsum text', active: false},
      {id: 5, title: 'Audit', description: 'Lorem ipsum text', active: false},
    ]
  }
}
