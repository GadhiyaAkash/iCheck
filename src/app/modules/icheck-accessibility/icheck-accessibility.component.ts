import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-icheck-accessibility',
  templateUrl: './icheck-accessibility.component.html',
  styleUrls: ['./icheck-accessibility.component.css']
})
export class IcheckAccessibilityComponent implements OnInit {

  accessbilityId:any = '';
  details:any
  
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.accessbilityId = this.activeRoute.snapshot.paramMap.get('id');
    this.details = this.moduleService.getIAccessbilityDetails(this.accessbilityId);
  }

}
