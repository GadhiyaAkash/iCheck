import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services/base.service';

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
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.iCheckInspectionList = this.baseService.IcheckInspectionList;
  }

  submit() {
    console.log("entity::", this.entity);
  }
}
