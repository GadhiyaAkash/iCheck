import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  /**
   * login API
   * @param params 
   */
  login(params: any) {
    return this.apiService.post('login', params).pipe(
      map(response => response)
    );
  }

  saveIcheckInspection(params: any): Observable<any> {
    return this.apiService.post('ichecksummaries', params).pipe(
      map(response => response)
    )
  }

  /**
   * get Icheck Summary Inspection Options
   */
  getICheckOptions() {
    return this.apiService.get('ichecksummaries/options').pipe(
      map(response => response)
    );
  }

  /**
   * get Icheck Summary Inspection Options charts
   */
  getICheckOptionsCharts() {
    return this.apiService.get('ichecksummaries/chart').pipe(
      map(response => response)
    );
  }

  /**
   * Get summary Table record for dashboard
   */
  getSummaryData(ID): Observable<any> {
    let params: any = {
      optionId: ID
    }
    return this.apiService.get('ichecksummaries', params);
  }

  /**
   * Delete i check summary 
   */
  deleleteICheckSummary(id):Observable<any> {
    return this.apiService.delete('deleleteICheckSummary/' + id);
  }
}
