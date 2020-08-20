import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../core/services/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private apiService: ApiService
  ) { }

  getChapters(id: any) {
    return this.apiService.get('attachmentdata/getChaptersAndSections/' + id).pipe(
      map(response => response)
    );
  }
  
  getQuestions(chapterID: any, sectionID:any) {
    return this.apiService.get('attachmentdata/getChapterDetails/' + chapterID + '/' + sectionID).pipe(
      map(response => response)
    );
  }

  getLocations() {
    return this.apiService.get('locations').pipe(
      map(response => response)
    );
  }

  getAttachments(id) {
    return this.apiService.get('ichecksummaries/getCheckListDetails/' + id).pipe(
      map(response => response)
    );
  }

  downloadAllAttachments(id) {
    return this.apiService.get('attachment/downloadAll/' + id).pipe(
      map(response => response)
    );
  }

  getPreviousSubmitssion(chapterID, sectionID, questionID) {
    return this.apiService.get('attachmentdata/previousChapterSubmittion/' + chapterID + '/' + sectionID + '/' + questionID).pipe(
      map(response => response)
    );
  }

  downloadSingleAttachments(id) {
    return this.apiService.get('attachment/download/' + id).pipe(
      map(response => response)
    );
  }

  deleteAttachment(id) {
    return this.apiService.get('attachment/' + id).pipe(
      map(response => response)
    );
  }

  /**
   * Get Ships Records
   */
  getShipsRecords() {
    return this.apiService.get('ships').pipe(
      map(response => response)
    );
  }

  /**
   * Return ranks record
   */
  getRanksDetails() {
    return this.apiService.get('ranks').pipe(
      map(response => response)
    );
  }
  
  getChapterStatus(id) {
    return this.apiService.get('attachmentdata/getChaptersStatus/' + id).pipe(
      map(response => response)
    );
  }

  iCheckSummariesColumns = [
    { title: 'Checklist ID', name: 'id', class: 'text-center' },
    { title: 'Checklist Name', name: 'vessel', sort: 'asc', width: '300px', class: '' },
    { title: 'Attachments', name: 'attachment', sort: false, class: 'text-center' },
    { title: 'Status', name: 'status', class: 'text-center' },
    { title: 'Created', name: 'createdAt', class: 'text-center' },
    { title: 'Last Updated', name: 'updatedAt', class: 'text-center' }
  ];

  questionOptions() {
    return [{
      type: 'radio',
      text: [
        { slug: 'satisfactory', title: 'Satisfactory', value: false },
        { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
        { slug: 'not_applicable', title: 'Not Applicable', value: false },
        { slug: 'not_seen', title: 'Not Seen' },
      ]
    }]
  }
  
  saveQuestion(id:any, params:any): Observable<any> {
    return this.apiService.postParams('attachmentdata/saveAnswer/' + id, null, false, params).pipe(
      map(response => response)
    );
  }
}
