import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ApiService } from '../core/services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Get Ships Records
   */
  getShipsRecords() {
    return this.apiService.get('ships').pipe(
      map( response => response)
    );
  }
  
  /**
   * Return ranks record
   */
  getRanksDetails() {
    return this.apiService.get('ranks').pipe(
      map( response => response)
    );
  }
  
  getRanksRecords() {
    return [
      { id: 1, name: 'Lieutenant General' },
      { id: 2, name: 'Major General' },
      { id: 3, name: 'Brigadier' }
    ]
  }

  iCheckSummariesColumns = [
    { title: 'Checklist ID', name: 'id', class: 'text-center' },
    { title: 'Checklist Name', name: 'name', sort: 'asc', width: '350px', class: '' },
    { title: 'Attachments', name: 'attachment', sort: false, class: 'text-center' },
    { title: 'Status', name: 'status', class: 'text-center' },
    { title: 'Created', name: 'created_at', class: 'text-center' },
    { title: 'Last Updated', name: 'updated_at', class: 'text-center' }
  ];

  iCheckSummariesRows = [
    { id: '743985738', name: 'Vessel Operation at the time of the inspection', attachment: 'view', status: 'COMPLETE', statusClass: "complete", created_at: 'Apr 22,2020', updated_at: 'Jun 05,2020' },
    { id: '743985739', name: 'Vessel IMO Number', attachment: 'view', status: 'SUBMITTED', statusClass: "success", created_at: 'May 05,2020', updated_at: 'Jun 10,2020' },
    { id: '743985740', name: 'Company IMO Number', attachment: 'view', status: 'IN PROGRESS', statusClass: "progress", created_at: 'Apr 13,2020', updated_at: 'Jun 08,2020' },
    { id: '743985741', name: 'Port Of Inspection', attachment: 'view', status: 'COMPLETE', statusClass: "complete", created_at: 'Apr 08,2020', updated_at: 'Jun 13,2020' },
    { id: '743985742', name: 'Deadweight: (metric tonnes)', attachment: 'view', status: 'SUBMITTED', statusClass: "success", created_at: 'May 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985743', name: 'Gross Tonnage', attachment: 'view', status: 'COMPLETE', statusClass: "complete", created_at: 'Apr 10,2020', updated_at: 'Jun 10,2020' },
    { id: '743985744', name: 'Date the vessel was delivered', attachment: 'view', status: 'SUBMITTED', statusClass: "success", created_at: 'May 11,2020', updated_at: 'Jun 22,2020' }
  ]

  getIchecklistDetails(id: any) {
    let checklistDetailTable = this.getChecklistDetailsTable(id);
    let checklistDetails = _.find(this.iCheckSummariesRows, (row) => row.id == id);
    checklistDetails['rows'] = checklistDetailTable;
    return checklistDetails;
  }

  getChecklistDetailsTable(id: any) {
    return [
      { id: 1, reference: id + '-1.1-01', question_number: 1.1, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 2, reference: id + '-1.1-02', question_number: 1.2, attachment_type: 'xls', attachment: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls' },
      { id: 3, reference: id + '-1.1-03', question_number: 1.3, attachment_type: 'xls', attachment: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls' },
      { id: 4, reference: id + '-1.1-04', question_number: 1.4, attachment_type: 'mp4', attachment: 'http://techslides.com/demos/sample-videos/small.mp4' },
      { id: 5, reference: id + '-1.1-05', question_number: 1.5, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 6, reference: id + '-1.1-06', question_number: 1.6, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { id: 7, reference: id + '-1.1-07', question_number: 1.7, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    ]
  }

  getChapterDetails(id: any) {
    return _.find(this.chapters, (cp) => cp.id == id);
  }

  updateChapter(chapter) {
    let index = _.findIndex(this.chapters, (cp:any) => cp.id == chapter.id);
    if (index !== -1) {
      this.allChapters[index] = chapter;
    }
  }

  chapters:any = [];
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

  getIAccessbilityDetails(id: any) {
    return {
      id: id,
      title: 'I-Check: Version 1.0',
      chapters: [
        { id: 1, title: 'Accessibility: How to Design for All' },
        {
          id: 2,
          title: 'Web Accessibility',
          childrens: [
            { id: 1, parent_id: 2, title: 'Captions for audio' },
            { id: 2, parent_id: 2, title: 'Device independence' },
          ]
        },
        { id: 3, title: 'Conformance to Standards' },
        { id: 4, title: 'Responsibility of Web' }
      ],
      completed_chapter: 2,
      total_chapter: 4,
      completion_percentage: 9,
      total_reading_time: '14h 30m'
    }
  }
}
