import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert.service';
import * as _ from 'lodash';
import { ModulesService } from 'src/app/modules/modules.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.css']
})
export class ChecklistTableComponent implements OnInit {

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
  private copyRows: any = [];

  constructor(
    private alertService: AlertService,
    private toster: ToastrService,
    private moduleService: ModulesService
  ) { }


  ngOnInit(): void {
    this.copyRows = [...this.rows];
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

  selectRow(row: any, event: any) {
    let index = _.findIndex(this.config.selectedRows, (r: any) => r.id == row.id);
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

  selectedOptions: any = [];
  updateOption(ops: any, event: any) {
    if (event.target.checked) {
      this.selectedOptions.push(ops.slug);
    } else {
      let index = _.findIndex(this.selectedOptions, (so: any) => (so == ops.slug));
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
    this.selectedOptions = _.uniq(this.selectedOptions);

    let _rows: any = [];
    _.forEach(this.selectedOptions, (option) => {
      let hasRow = _.filter(this.copyRows, (row) => {
        return row.attachment_type == option;
      });
      if (hasRow && hasRow.length) {
        _.forEach(hasRow, (hr) => {
          _rows.push(hr);
        })
      }
    });

    if (this.selectedOptions.length == 0) {
      this.rows = this.copyRows;
    } else {
      this.rows = _.sortBy(_rows, o => o.id);
    }
  }

  deleteTableRow(id: any) {
    if (this.config.deleteRow) {
      this.config.deleteRow(id);
    }
  }

  downloadSingleAttachment(row: any) {
    this.alertService.confirm('You are about to download this checklist attachments!').then((response) => {
      if (response.isConfirmed) {
        this.moduleService.downloadSingleAttachments(row.id).subscribe((res) => {
          console.log("res::", res);
        }, (error) => {
          this.toster.error("Something went wrong!");
        })
      }
    });

  }
}
