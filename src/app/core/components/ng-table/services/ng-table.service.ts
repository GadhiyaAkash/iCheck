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

  allUserColumns = [
    { title: 'Checklist ID', name: 'id' },
    { title: 'Checklist Name', name: 'name', sort: 'asc' },
    { title: 'Attachments', name: 'attachment' },
    { title: 'Status', name: 'status' },
    { title: 'Created', name: 'created_at' },
    { title: 'Last Updated', name: 'updated_at' }
  ];

  allUserRows = [
    { id: '#743985738', name: 'Checklist Name 1', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985739', name: 'Checklist Name 2', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985740', name: 'Checklist Name 3', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985741', name: 'Checklist Name 4', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985742', name: 'Checklist Name 5', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985743', name: 'Checklist Name 6', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '#743985744', name: 'Checklist Name 7', attachment: 'view', status: 'completed', created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' }
  ]
}
