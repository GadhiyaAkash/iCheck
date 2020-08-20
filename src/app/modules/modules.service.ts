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

  getChapterDetails(id: any) {
    return _.find(this.chapters, (cp) => cp.id == id);
  }

  updateChapter(chapter) {
    let index = _.findIndex(this.chapters, (cp: any) => cp.id == chapter.id);
    if (index !== -1) {
      this.allChapters[index] = chapter;
    }
  }

  chapters: any = [];
  allChapters() {
    this.chapters = [
      {
        parent_id: null,
        id: 1,
        title: 'Accessibility: How to Design for All',
        questions: [
          {
            id: 1,
            chapter_id: 1,
            title: 'What should you do with accessibility checker tools?',
            guidance: 'Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of evaluation tools that you can filter to find ones that match your particular needs.',
            remark: '',
            options: [{
              type: 'radio',
              text: [
                { slug: 'satisfactory', title: 'Satisfactory', value: false },
                { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
                { slug: 'not_applicable', title: 'Not Applicable', value: false },
                { slug: 'not_seen', title: 'Not Seen' },
              ]
            }],
            attachments: [
              { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' }
            ]
          }
        ],
      },
      {
        id: 2,
        title: 'Web Accessibility',
        sections: [{
          id: 1,
          parent_id: 2,
          title: 'Captions for audio',
          questions: [
            {
              id: 1,
              chapter_id: 2,
              section_id: 1,
              title: 'What Is Web Accessibility?',
              guidance: 'Web accessibility evaluation tools are software programs or online services that help you determine if web content meets accessibility guidelines. This page provides a list of evaluation tools that you can filter to find ones that match your particular needs.',
              remark: '',
              options: [{
                type: 'radio',
                text: [
                  { slug: 'satisfactory', title: 'Satisfactory', value: false },
                  { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
                  { slug: 'not_applicable', title: 'Not Applicable', value: false },
                  { slug: 'not_seen', title: 'Not Seen' },
                ]
              }],
              attachments: [
                { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' },
                { name: 'evidence.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '24kb', src: '' }
              ]
            }
          ],
        },
        {
          id: 2,
          parent_id: 2,
          title: 'Device independence',
          questions: [
            {
              id: 1,
              chapter_id: 2,
              section_id: 2,
              title: 'Benefits for People Without Disabilities?',
              guidance: 'Organizations interested in CSR and the digital divide may want to know how accessibility also improves access for',
              remark: '',
              options: [{
                type: 'radio',
                text: [
                  { slug: 'satisfactory', title: 'Satisfactory', value: false },
                  { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
                  { slug: 'not_applicable', title: 'Not Applicable', value: false },
                  { slug: 'not_seen', title: 'Not Seen' },
                ]
              }],
              attachments: [
                { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' },
                { name: 'evidence.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '24kb', src: '' },
                { name: 'accessbility.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '5kb', src: '' }
              ]
            }
          ],
        }]
      },
      {
        parent_id: null,
        id: 3,
        title: 'Conformance to Standards',
        questions: [
          {
            id: 1,
            chapter_id: 3,
            title: 'When is the last time you experienced nostalgia?',
            guidance: 'This page provides a list of evaluation tools that you can filter to find ones that match your particular needs.',
            remark: '',
            options: [{
              type: 'radio',
              text: [
                { slug: 'satisfactory', title: 'Satisfactory', value: false },
                { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
                { slug: 'not_applicable', title: 'Not Applicable', value: false },
                { slug: 'not_seen', title: 'Not Seen' },
              ]
            }],
            attachments: [
              { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' },
              { name: 'evidence.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '24kb', src: '' },
              { name: 'evalution.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '48kb', src: '' },
              { name: 'images.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '25kb', src: '' },
            ]
          }],
      },
      {
        parent_id: null,
        id: 4,
        title: 'Responsibility of Web',
        questions: [
          {
            id: 1,
            chapter_id: 4,
            title: "What's the scariest dream you've ever had?",
            guidance: 'Services that help you determine if web content meets accessibility guidelines. This page provides a list of evaluation tools that you can filter to find ones that match your particular needs.',
            remark: '',
            options: [{
              type: 'radio',
              text: [
                { slug: 'satisfactory', title: 'Satisfactory', value: false },
                { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
                { slug: 'not_applicable', title: 'Not Applicable', value: false },
                { slug: 'not_seen', title: 'Not Seen' },
              ]
            }],
            attachments: [
              { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' },
              { name: 'evidence.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '24kb', src: '' }
            ]
          }],
      }
    ];
  }

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
