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
      {id: 1, image: 'https://via.placeholder.com/150', pieChartData: [25, 35, 40], pieChartLabels: ['COMPLETE', 'SUBMITTED', 'IN PROGRESS'],  title: 'Pre-PSC', description: '', active: true},
      {id: 2, image: 'https://via.placeholder.com/150', pieChartData: [20, 30, 50], pieChartLabels: ['COMPLETE', 'SUBMITTED', 'IN PROGRESS'], title: 'Quarterly Inspection', description: '', active: false},
      {id: 3, image: 'https://via.placeholder.com/150', pieChartData: [15, 25, 60], pieChartLabels: ['COMPLETE', 'SUBMITTED', 'IN PROGRESS'], title: 'Pre-vetting', description: '', active: false},
      {id: 4, image: 'https://via.placeholder.com/150', pieChartData: [10, 20, 70], pieChartLabels: ['COMPLETE', 'SUBMITTED', 'IN PROGRESS'],title: 'Pre-CDI', description: '', active: false},
      {id: 5, image: 'https://via.placeholder.com/150', pieChartData: [5, 15, 80], pieChartLabels: ['COMPLETE', 'SUBMITTED', 'IN PROGRESS'], title: 'Audit', description: '', active: false},
    ]
  }

  /**
   * get Icheck Summary Inspection List
   */
  public get IcheckInspectionList() {
    return [
      {id: 1, title: 'Pre-PSC', description: 'Duties of Port State Control', active: true},
      {id: 2, title: 'Quarterly Inspection', description: 'Hygiene of the crew quarters', active: false},
      {id: 3, title: 'Pre-vetting', description: 'During a Pre-vetting Inspection', active: false},
      {id: 4, title: 'Pre-CDI', description: 'Cdi Inspections | Shipping | Water Transport', active: false},
      {id: 5, title: 'Audit', description: 'Audit Inspections', active: false},
    ]
  }
}
