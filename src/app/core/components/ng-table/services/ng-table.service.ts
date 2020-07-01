import { Injectable } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { LocalService } from './../../../services/local.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class NgTableService {

  constructor(
    // private apiService: ApiService,
    private localService: LocalService
  ) {}

  /**
   * Default Pagination Params
   */
  public get defaultPagination() {
    return <Pagination>{
      page: 1,
      per_page: 5,
      maxSize: 5,
      numPages: 1,
      length: 0
    }
  }

  /**
   * Return Sorting Parameter
   * @param column 
   */
  getSortingParams(column: any) {
    let params = [];
    column.forEach((row) => {
      if (row.sort && row.sort != false) {
        params.push({
          colId: row.name,
          sort: row.sort
        });
      }
    });
    return params;
  }

  /**
   * Return User data based on params
   */
  // getData(params: any = {}): Observable<any> {
  //   return this.apiService.post('user/custom-pagination?page=' + params.page, params).pipe(
  //     map(resp => resp)
  //   );
  // }
}
