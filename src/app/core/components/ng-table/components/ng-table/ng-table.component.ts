import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import * as _ from 'lodash';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss']
})
export class NgTableComponent implements OnInit {

  @Input() public rows: Array<any> = [];

  @Input()
  public set config(conf: any) {
    if (!conf.className) {
      conf.className = 'table-striped';
    }
    if (conf.className instanceof Array) {
      conf.className = conf.className.join(' ');
    }
    this._config = conf;
  }

  // Outputs (Events)
  @Output() public tableChanged: EventEmitter<any> = new EventEmitter();

  public showFilterRow: Boolean = false;

  @Input()
  public set columns(values: Array<any>) {
    values.forEach((value: any) => {
      if (value.filtering) {
        this.showFilterRow = true;
      }
      if (value.className && value.className instanceof Array) {
        value.className = value.className.join(' ');
      }
      let column = this._columns.find((col: any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  private _columns: Array<any> = [];
  private _config: any = {};

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  public get columns(): Array<any> {
    return this._columns;
  }

  public get config(): any {
    return this._config;
  }

  public get configColumns(): any {
    let sortColumns: Array<any> = [];

    this.columns.forEach((column: any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return { columns: sortColumns };
  }

  public onChangeTable(column: any): void {
    this._columns.forEach((col: any) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({ sorting: this.configColumns });
  }

  public getData(row: any, propertyName: string): string {
    return propertyName.split('.').reduce((prev: any, curr: string) => prev[curr], row);
  }

  selectRow(row:any, event:any) {
    let index = _.findIndex(this.config.selectedRows, (r:any) => r.id == row.id);
    if (event.target.checked) {
      if (index == -1) {
        this.config.selectedRows.push(row);
      }
    } else {
      if (index !== -1) {
        this.config.selectedRows.splice(index, 1);
      }
    }
  }

  deleteRow(row:any) {
    this.alertService.confirm('You are about to delete this checklist!').then((response) => {
      if (response.isConfirmed) {
        let index = _.findIndex(this.rows, (r) => r.id == row.id);
        if (index !== -1) {
          this.rows.splice(index, 1);
        }
      }
    });
  }
}
