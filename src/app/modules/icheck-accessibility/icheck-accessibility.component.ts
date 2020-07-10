import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import * as _ from 'lodash';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-icheck-accessibility',
  templateUrl: './icheck-accessibility.component.html',
  styleUrls: ['./icheck-accessibility.component.css']
})
export class IcheckAccessibilityComponent implements OnInit {

  accessbilityId: any = '';
  details: any;
  ranks: Array<any> = [];

  activeChapter: any;
  activeSection: any = {};
  activeQuestion: any = {};
  indexes = {
    chapter: 0,
    section: 0,
    question: 0
  }
  showPreviousSubmission: boolean = false;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    private alertService: AlertService
  ) {
    this.moduleService.allChapters();
  }

  ngOnInit(): void {
    this.accessbilityId = this.activeRoute.snapshot.paramMap.get('id');
    this.details = this.moduleService.getIAccessbilityDetails(this.accessbilityId);
    if (this.details && this.details.chapters) {
      this.getChapterDetails(this.details.chapters[0]);
    }
    this.ranks = this.moduleService.getRanksRecords();
  }

  updateIndex(key, id) {
    switch (key) {
      case 'chapters':
        this.indexes.chapter = _.findIndex(this.details.chapters, (cp: any) => cp.id == id)
        break;
      case 'sections':
        this.indexes.section = _.findIndex(this.activeChapter.sections, (cp: any) => cp.id == id);
        break;
      case 'question':
        this.indexes.question = _.findIndex(this.allQuetions, (cp: any) => cp.id == id);
        break;
    }
  }

  getChapterDetails(chapter: any) {
    this.activeSection = {};

    this.activeChapter = this.moduleService.getChapterDetails(chapter.id);
    console.log("this.activeChapter::", this.activeChapter);
    this.updateIndex('chapters', this.activeChapter.id)
    if (this.activeChapter && this.activeChapter.sections) {
      this.activeSection = this.activeChapter.sections[0];
      this.updateIndex('sections', this.activeSection.id)
      this.transformQuestions(this.activeSection.questions)
    } else {
      this.transformQuestions(this.activeChapter.questions)
    }
  }

  questions: any = [];
  allQuetions: any = [];
  transformQuestions(questions) {
    this.activeQuestion = questions[0];
    this.allQuetions = questions;
    this.updateIndex('question', this.activeQuestion.id)
  }

  showRemarks: boolean = false;
  updateSelectedQuetion(option, slug, event) {
    if (event.target.checked) {
      _.forEach(option, (qa) => {
        if (qa.slug == slug) {
          qa.value = true;
        } else {
          qa.value = false;
        }
      })
    }
  }

  previous() {
    let indexes = Object.assign({}, this.indexes)
    let hasNextQuestion = this.hasNext('question', --indexes.question);
    if (hasNextQuestion) {
      --this.indexes.question;
      this.activeQuestion = hasNextQuestion;
    } else if (this.activeSection.id) {
      let hasNextSection = this.hasNext('sections', --indexes.section);
      if (hasNextSection) {
        --this.indexes.section;
        this.activeSection = hasNextSection;
        this.transformQuestions(this.activeSection.questions)
      } else {
        let hasNextChapter = this.hasNext('chapters', --indexes.chapter);
        if (hasNextChapter) {
          this.getChapterDetails(hasNextChapter);
        }
      }
    } else {
      let hasNextChapter = this.hasNext('chapters', --indexes.chapter);
      if (hasNextChapter) {
        this.getChapterDetails(hasNextChapter);
      }
    }
  }

  nextQuestion() {
    let indexes = Object.assign({}, this.indexes)
    let hasNextQuestion = this.hasNext('question', ++indexes.question);
    if (hasNextQuestion) {
      ++this.indexes.question;
      this.activeQuestion = hasNextQuestion;
    } else if (this.activeSection.id) {
      let hasNextSection = this.hasNext('sections', ++indexes.section);
      if (hasNextSection) {
        ++this.indexes.section;
        this.activeSection = hasNextSection;
        this.transformQuestions(this.activeSection.questions)
      } else {
        let hasNextChapter = this.hasNext('chapters', ++indexes.chapter);
        if (hasNextChapter) {
          this.moduleService.updateChapter(this.activeChapter);
          this.getChapterDetails(hasNextChapter);
        }
      }
    } else {
      let hasNextChapter = this.hasNext('chapters', ++indexes.chapter);
      if (hasNextChapter) {
        this.moduleService.updateChapter(this.activeChapter);
        this.getChapterDetails(hasNextChapter);
      }
    }
    console.log("indezxedd::", this.indexes);
  }

  nextChapter(chapter) {
    this.moduleService.updateChapter(this.activeChapter);
    this.getChapterDetails(chapter);
  }

  nextSection(section) {
    this.activeChapter = this.moduleService.getChapterDetails(section.parent_id);
    console.log("this.activeChapter::", this.activeChapter);
    this.updateIndex('chapters', this.activeChapter.id)
    if (this.activeChapter && this.activeChapter.sections) {
      let index = _.findIndex(this.activeChapter.sections, (ss: any) => ss.id == section.id);
      this.activeSection = this.activeChapter.sections[index];
      this.updateIndex('sections', this.activeSection.id)
      this.transformQuestions(this.activeSection.questions)
    } else {
      this.transformQuestions(this.activeChapter.questions)
    }
  }
  hasNext(key, index) {
    switch (key) {
      case 'chapters':
        return this.details.chapters[index];
        break;
      case 'sections':
        return this.activeChapter.sections[index];
        break;
      case 'question':
        return this.allQuetions[index];
        break;
    }
  }

  submitQuestion() {
    this.alertService.confirm('congratulations! you have successfully completed all chapters.').then((response) => {
      if (response.isConfirmed) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  previousSubmission: any = {};
  getPreviousSubmitssion(id:any) {
    this.showPreviousSubmission = !this.showPreviousSubmission;
    this.previousSubmission = {
      inspection_date: '11/04/2020',
      reviewed_by: 'John Doe',
      review_date: '15/04/2020',
      approval_date: '18/04/2020',
      attachments: [
        { name: 'document.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '12kb', src: '' },
        { name: 'evidence.jpg', thumbline_image: 'https://via.placeholder.com/150', size: '24kb', src: '' }
      ],
      option: [
        { slug: 'satisfactory', title: 'Satisfactory', value: false },
        { slug: 'not_satisfactory', title: 'Not Satisfactory', value: false },
        { slug: 'not_applicable', title: 'Not Applicable', value: false },
        { slug: 'not_seen', title: 'Not Seen' },
      ],
      remark: 'Submission Comments allows users to view all assignment submission comments sent and received within the last four weeks.'
    } 
  }
}
