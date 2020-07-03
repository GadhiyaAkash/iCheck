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

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.checkListId = this.activeRoute.snapshot.paramMap.get('id');
    this.checklistDetails = this.moduleService.getIchecklistDetails(this.checkListId);
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
}
