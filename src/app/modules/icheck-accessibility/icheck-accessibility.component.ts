import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-icheck-accessibility',
  templateUrl: './icheck-accessibility.component.html',
  styleUrls: ['./icheck-accessibility.component.css']
})
export class IcheckAccessibilityComponent implements OnInit {

  accessbilityId: any = '';
  details: any
  chapterDetails: any;
  ranks: Array<any> = [];

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.accessbilityId = this.activeRoute.snapshot.paramMap.get('id');
    this.details = this.moduleService.getIAccessbilityDetails(this.accessbilityId);
    if (this.details && this.details.chapters) {
      this.getChapterDetails(this.details.chapters[0].id);
    }
    this.ranks = this.moduleService.getRanksRecords();
  }

  getChapterDetails(id: any) {
    this.chapterDetails = this.moduleService.getChapterDetails(id);
  }
}
