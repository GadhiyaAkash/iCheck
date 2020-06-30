import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Post data to remote server to save data
   */
  post(URL:any, params:any):Observable<any> {
    return this.apiService.post(URL, params);
  }
}
