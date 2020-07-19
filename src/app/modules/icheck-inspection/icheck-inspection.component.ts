import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-icheck-inspection',
  templateUrl: './icheck-inspection.component.html',
  styleUrls: ['./icheck-inspection.component.css']
})
export class IcheckInspectionComponent implements OnInit {

  iCheckInspectionList: Array<any> = [];
  entity: any = {
    icheckSummaryMaster: ''
  }

  constructor(
    private baseService: BaseService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getICheckOption();
  }

  getICheckOption() {
    this.baseService.getICheckOptions().subscribe((response) => {
      this.iCheckInspectionList = _.map(response.details, (res) => {
        res.active = false;
        return res;
      });
      let firstOptions = _.head(this.iCheckInspectionList);
      if (firstOptions) {
        firstOptions.active = true;
        this.entity.icheckSummaryMaster = firstOptions.id;
      }
    });
  }

  submit() {
    this.baseService.saveIcheckInspection(this.entity).subscribe((res) => {
      this.alertService.success('Successfully created I-Check Inspection.').then((response) => {
        this.router.navigate(['dashboard']);
      });
    })
  }

  selectIcheckInspection(summary: any) {
    this.iCheckInspectionList.forEach((s) => {
      s.active = (s.id == summary.id) ? true : false
    });
    this.entity.icheckSummaryMaster = summary.id;
  }
}
