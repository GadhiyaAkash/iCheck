import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { NgTableService } from 'src/app/core/components/ng-table/services/ng-table.service';
import * as _ from 'lodash';
import { ModulesService } from '../modules.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import 'chart.piecelabel.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  public colors: any[] = [{ backgroundColor: ["#39C4A4", "#2396E3", "#F5B133"] }];
  
  iCheckSummaries:Array<any> = [];
  entity:any = {
    check_summary_id: ''
  }
  showActionButton:boolean = false;
  seletedRecords: Array<any> = [];

  public rows:Array<any> = [];
  public columns:Array<any> = this.moduleService.iCheckSummariesColumns;
  private data:Array<any> = this.moduleService.iCheckSummariesRows;
  
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
    private moduleService: ModulesService,
    private baseService: BaseService,
    private ngTableService: NgTableService,
    private alertService: AlertService
  ) {
    this.length = this.data.length;
  }

  ngOnInit(): void {
    this.iCheckSummaries = this.baseService.IcheckSummariesList;
    this.entity.summary_title = this.iCheckSummaries[0].title;
    this.onChangeTable(this.config);
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

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          let itemColumn = _.toLower(item[column.name]);
          return itemColumn.match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) => {
        let itemColumn = _.toLower(item[config.filtering.columnName]);
        return itemColumn.match(this.config.filtering.filterString);
      });
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        let itemColumn = _.toLower(item[column.name]);
        if (itemColumn.match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }



  selectIcheckSummary(summary:any) {
    this.iCheckSummaries.forEach((s) => {
      s.active = (s.id == summary.id) ? true : false
    });
    this.entity.check_summary_id = summary.id;
    this.entity.summary_title = summary.title;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    console.log("config::", config);
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  /**
   * Checkbox callback function from ngTable library
   */
  onCheckboxCallback(seletedRecords: Array<any>) {
    this.seletedRecords = seletedRecords || [];
    this.showActionButton = this.seletedRecords.length ? true : false;
  }

  deleteMultiple() {
    this.alertService.confirm('You are about to delete selected this checklist!').then((response) => {
      if (response.isConfirmed) {
        _.forEach(this.config.selectedRows, (sr) => {
          this.deleteSingleRow(sr);
        })
      }
    });
  }

  deleteSingleRow(row) {
    let index = _.findIndex(this.rows, (r) => r.id == row.id);
    if (index !== -1) {
      this.rows.splice(index, 1);
    }
  }
}
