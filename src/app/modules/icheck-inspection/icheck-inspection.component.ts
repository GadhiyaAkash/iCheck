import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icheck-inspection',
  templateUrl: './icheck-inspection.component.html',
  styleUrls: ['./icheck-inspection.component.css']
})
export class IcheckInspectionComponent implements OnInit {

  iCheckInspectionList: Array<any> = [];
  entity:any = {
    
  }

  constructor(
    private baseService: BaseService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.iCheckInspectionList = this.baseService.IcheckInspectionList;
  }

  submit() {
    this.alertService.success('Successfully created I-Check Inspection.').then((response) => {
      if (response.isConfirmed) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  selectIcheckInspection(summary:any) {
    this.iCheckInspectionList.forEach((s) => {
      s.active = (s.id == summary.id) ? true : false
    });
    this.entity.check_summary_id = summary.id;
  }
}
