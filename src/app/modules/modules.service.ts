import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor() { }

  iCheckSummariesColumns = [
    { title: 'Checklist ID', name: 'id' },
    { title: 'Checklist Name', name: 'name', sort: 'asc' },
    { title: 'Attachments', name: 'attachment' },
    { title: 'Status', name: 'status' },
    { title: 'Created', name: 'created_at' },
    { title: 'Last Updated', name: 'updated_at' }
  ];

  iCheckSummariesRows = [
    { id: '743985738', name: 'Checklist Name 1', attachment: 'view', status: 'COMPLETE', statusClass:"complete", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985739', name: 'Checklist Name 2', attachment: 'view', status: 'SUBMITTED', statusClass:"success", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985740', name: 'Checklist Name 3', attachment: 'view', status: 'IN PROGRESS', statusClass:"progress", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985741', name: 'Checklist Name 4', attachment: 'view', status: 'COMPLETE', statusClass:"complete", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985742', name: 'Checklist Name 5', attachment: 'view', status: 'SUBMITTED', statusClass:"success", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985743', name: 'Checklist Name 6', attachment: 'view', status: 'COMPLETE', statusClass:"complete", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' },
    { id: '743985744', name: 'Checklist Name 7', attachment: 'view', status: 'SUBMITTED', statusClass:"success", created_at: 'Apr 22,2020', updated_at: 'Jun 10,2020' }
  ]

  getIchecklistDetails(id:any) {
    let checklistDetailTable = this.getChecklistDetailsTable(id);
    let checklistDetails = _.find(this.iCheckSummariesRows, (row) => row.id == id);
    checklistDetails['rows'] = checklistDetailTable;
    return checklistDetails;
  }

  getChecklistDetailsTable(id:any) {
    return [
      {id: 1, reference: id + '-1.1-01', question_number: 1.1, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
      {id: 2, reference: id + '-1.1-02', question_number: 1.2, attachment_type: 'xls', attachment: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls'},
      {id: 3, reference: id + '-1.1-03', question_number: 1.3, attachment_type: 'xls', attachment: 'https://file-examples.com/wp-content/uploads/2017/02/file_example_XLS_10.xls'},
      {id: 4, reference: id + '-1.1-04', question_number: 1.4, attachment_type: 'mp4', attachment: 'http://techslides.com/demos/sample-videos/small.mp4'},
      {id: 5, reference: id + '-1.1-05', question_number: 1.5, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
      {id: 6, reference: id + '-1.1-06', question_number: 1.6, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
      {id: 7, reference: id + '-1.1-07', question_number: 1.7, attachment_type: 'pdf', attachment: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'},
    ]
  }

  getIAccessbilityDetails(id:any) {
    return {
      title: 'icheck: Version 1.0',
      chapters: [
        { id: 1, title: 'Chapters 1' },
        { 
          id: 2, 
          title: 'Chapters 2',
          childrens: [
            { id: 1, parent_id: 2, title: 'section 2.1' },
            { id: 2, parent_id: 2, title: 'section 2.2' },
            { id: 3, parent_id: 2, title: 'section 2.3' },
            { id: 4, parent_id: 2, title: 'section 2.4' },
          ]
        },
        { id: 3, title: 'Chapters 3' },
        { id: 4, title: 'Chapters 4' },
        { 
          id: 5, 
          title: 'Chapters 5',
          childrens: [
            { id: 1, parent_id: 5, title: 'section 5.1' },
            { id: 2, parent_id: 5, title: 'section 5.2' }
          ] 
        },
        { id: 6, title: 'Chapters 6' },
        { id: 7, title: 'Chapters 7' },
        { id: 8, title: 'Chapters 8' },
      ],
      completed_chapter: 2,
      total_chapter: 8,
      completion_percentage: 9,
      total_reading_time: '14h 30m'
    }
  }
}
