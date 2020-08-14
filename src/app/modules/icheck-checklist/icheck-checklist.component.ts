import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import * as _ from 'lodash';
import { AlertService } from 'src/app/core/services/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-icheck-checklist',
  templateUrl: './icheck-checklist.component.html',
  styleUrls: ['./icheck-checklist.component.css']
})
export class IcheckChecklistComponent implements OnInit {

  checkListId: any = '';
  checklistDetails: any = '';

  public rows: Array<any> = [];
  public columns: Array<any> = this.iCheckChecklistColumns;
  private data: Array<any> = [];

  public page: number = 1;
  public itemsPerPage: number = 5;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    selectedRows: [],
    deleteRow: this.deleteTableRow,
    that: this
  };
  checklistSummary: any = {};
  attachments: any = [];

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    private alertService: AlertService,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkListId = this.activeRoute.snapshot.paramMap.get('id');
    this.getAttachments();
    this.checklistDetails = this.moduleService.getIchecklistDetails(this.checkListId);
  }
  
  getAttachments() {
    this.moduleService.getAttachments(this.checkListId).subscribe((res) => {
      if (res.details && res.details['I-Check Summry']) {
        this.checklistSummary = res.details['I-Check Summry'];
        switch (this.checklistSummary.status) {
          case "In Progress":
            this.checklistSummary.statusClass = "progress"
            break;
          case "Complete":
            this.checklistSummary.statusClass = "complete"
            break;
          case "Submitted":
            this.checklistSummary.statusClass = "success"
            break;
        }
      }
      if (res.details && res.details['Attachments']) {
        this.attachments = res.details['Attachments'];
        if (this.attachments[this.attachments.length - 1]) {
          this.checklistSummary.lastRefereces = this.attachments[this.attachments.length - 1].referenceno;
        }
        this.data = this.attachments || [];
        this.length = this.data.length;
        this.onChangeTable(this.config);
      }
    })
  }
  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
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

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

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
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  that:any;
  deleteTableRow(id: any) {
    this.that.alertService.confirm('You are about to delete this checklist attachments!').then((response) => {
      if (response.isConfirmed) {
        this.moduleService.deleteAttachment(id).subscribe((res) => {
          this.that.getAttachments();
        }, (error) => {
          this.that.toster.error("Something went wrong!");
        })
      }
    });
  }

  get iCheckChecklistColumns() {
    return [
      { title: 'Serial No.', name: 'id', class: 'text-center' },
      { title: 'Reference No.', name: 'reference', sort: 'asc', class: 'text-center', dd: true, options: [{ title: 'AANNNNAAA', slug: 'aa' }, { title: '00444800', slug: 'bb' }, { title: 'SN0001CRN', slug: 'cc' }] },
      { title: 'Question No.', name: 'question_number', dd: true, class: 'text-center', options: [{ title: '1' }, { title: '2' }, { title: '3' }] },
      { title: 'Attachment Type', name: 'attachment_type', dd: true, checkbox: true, class: 'text-center', options: [{ title: 'PDF', slug: 'pdf' }, { title: 'XLSX', slug: 'xls' }, { title: 'MP4', slug: 'mp4' }] }
    ];
  }

  downloadAll() {
    this.alertService.confirm('You are about to download all attachments!').then((response) => {
      if (response.isConfirmed) {
        this.moduleService.downloadAllAttachments(this.checklistSummary.id).subscribe((res) => {
          console.log("res::", res);
        }, (error) => {
          this.toster.error("Something went wrong!");
        })
      }
    });
  }
}
