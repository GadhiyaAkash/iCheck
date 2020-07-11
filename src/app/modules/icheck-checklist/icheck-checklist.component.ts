import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import * as _ from 'lodash';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-icheck-checklist',
  templateUrl: './icheck-checklist.component.html',
  styleUrls: ['./icheck-checklist.component.css']
})
export class IcheckChecklistComponent implements OnInit {

  checkListId: any = '';
  checklistDetails: any = '';

  public rows:Array<any> = [];
  public columns:Array<any> = this.iCheckChecklistColumns;
  private data:Array<any> = [];

  public page:number = 1;
  public itemsPerPage:number = 5;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    selectedRows: []
  };

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.checkListId = this.activeRoute.snapshot.paramMap.get('id');
    this.checklistDetails = this.moduleService.getIchecklistDetails(this.checkListId);
    this.data = this.checklistDetails.rows;
    this.length = this.data.length;
    this.onChangeTable(this.config);
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let sortedData = this.changeSort(this.data, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }
  
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  deleteTableRow(id: any) {
    this.alertService.confirm('You are about to delete this checklist attachments!').then((response) => {
      if (response.isConfirmed) {
        let index = _.findIndex(this.checklistDetails.rows, (row: any) => row.id == id);
        if (index !== -1) {
          this.checklistDetails.rows.splice(index, 1);
        }
      }
    });

  }
  
  get iCheckChecklistColumns() {
    return [
      { title: 'Serial No.', name: 'id', class: 'text-center' },
      { title: 'Reference No.', name: 'reference', sort: 'asc', class: 'text-center', dd: true, options: [{ title: 'AANNNNAAA', slug: 'aa' }, { title: '00444800', slug: 'bb' }, { title: 'SN0001CRN', slug: 'cc' }] },
      { title: 'Question No.', name: 'question_number', dd: true, class: 'text-center', options: [{ title: '1' }, { title: '2' }, { title: '3' }] },
      { title: 'Attachment Type', name: 'attachment_type', dd: true, checkbox: true, class: 'text-center', options: [{ title: 'PDF', slug: 'pdf' }, { title: 'XLS', slug: 'xls' }, { title: 'MP4', slug: 'mp4' }] }
    ]; 
  }
}
