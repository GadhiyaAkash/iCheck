import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = null;
  constructor(
    private httpService: HttpService
  ) {
    this.API_URL = '' //@TODO ADD YOUR API URL
  }


  get(path: string, params: URLSearchParams = new URLSearchParams(), hideLoader: boolean = false): Observable<any> {
    return this.httpService.get(`${this.API_URL}${path}`, params, hideLoader);
  }

  delete(path: string, params: URLSearchParams = new URLSearchParams(), hideLoader: boolean = false): Observable<any> {
    return this.httpService.delete(`${this.API_URL}${path}`, params, hideLoader);
  }


  /**
   * @description POST api call with applicaiton/json request
   * @param path API URL
   * @param body Request Parameters
   * @param hideLoader Hide Loader
   */
  post(path: string, body: Object = {}, hideLoader: boolean = false): Observable<any> {
    return this.httpService.post(`${this.API_URL}${path}`, body, hideLoader);
  }

  /**
   * @description POST api call with application/x-www-form-urlencoded request
   * @param path API URL
   * @param body Request Parameters
   * @param hideLoader Hide Loader
   */
  postForm(path: string, body: Object = {}, hideLoader: boolean = false): Observable<any> {
    return this.httpService.postForm(`${this.API_URL}${path}`, body, hideLoader);
  }
}
