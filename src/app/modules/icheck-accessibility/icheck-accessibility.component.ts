import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import * as _ from 'lodash';
import { AlertService } from 'src/app/core/services/alert.service';
import { LocalService } from 'src/app/core/services/local.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-icheck-accessibility',
  templateUrl: './icheck-accessibility.component.html',
  styleUrls: ['./icheck-accessibility.component.css']
})
export class IcheckAccessibilityComponent implements OnInit {

  accessbilityId: any = '';
  details: any;
  ranks: Array<any> = [];
  previousSubmission: any = {};

  activeChapter: any = {};
  activeSection: any = {};
  activeQuestion: any = {};
  indexes = {
    chapter: 0,
    section: 0,
    question: 0
  }
  showPreviousSubmission: boolean = false;
  locations: Array<any> = [];
  chapterList: Array<any> = [];
  checklistDetails: any = '';
  metaData: any = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService,
    private alertService: AlertService,
    private localService: LocalService,
    private toster: ToastrService
  ) {
    this.accessbilityId = this.activeRoute.snapshot.paramMap.get('id');
    this.getChapters();
    this.getLocations();
    this.getRanksRecords();
    this.getChapterMeta();
  }

  ngOnInit(): void {
    this.checklistDetails = this.localService.get('checklist');
    this.details = this.moduleService.getIAccessbilityDetails(this.accessbilityId);
  }

  getChapterMeta() {
    this.moduleService.getChapterStatus(this.accessbilityId).subscribe((response) => {
      this.metaData = response.details || {};
      if (this.metaData) {
        this.metaData.completed_per = (100 * this.metaData.completed_chapters) / this.metaData.total_chapters;
      }
    });
  }

  getRanksRecords() {
    this.moduleService.getRanksDetails().subscribe((response) => {
      this.ranks = response.details;
    });
  }

  getLocations() {
    this.moduleService.getLocations().subscribe((res) => {
      this.locations = res.details;
    });
  }

  getChapters() {
    this.moduleService.getChapters(this.accessbilityId).subscribe((res) => {
      this.chapterList = res.details || [];
      console.log("this.chapterList::", this.chapterList);
      this.getChapterDetails(this.chapterList[0]);

    })
  }

  updateIndex(key, id) {
    switch (key) {
      case 'chapters':
        this.indexes.chapter = _.findIndex(this.chapterList, (cp: any) => cp.chapterId == id)
        break;
      case 'sections':
        this.indexes.section = _.findIndex(this.activeChapter.sections, (cp: any) => cp.sectionId == id);
        break;
      case 'question':
        this.indexes.question = _.findIndex(this.allQuetions, (cp: any) => cp.id == id);
        break;
    }
  }

  getChapterDetails(chapter: any) {
    this.activeSection = {};
    console.log("chapter::", chapter);


    this.activeChapter = chapter;
    this.updateIndex('chapters', this.activeChapter.chapterId)

    if (this.activeChapter && this.activeChapter.sections) {
      this.activeSection = this.activeChapter.sections[0];
      this.updateIndex('sections', this.activeSection.sectionId)
      this.getQuestions();
      // this.transformQuestions(this.activeSection.questions)
    } else {
      this.transformQuestions(this.activeChapter.questions)
    }
  }

  getQuestions() {
    this.moduleService.getQuestions(
      this.activeChapter.chapterId,
      this.activeSection.sectionId
    ).subscribe((res) => {
      console.log("res::", res.details);
      this.activeSection.questions = res.details.data;
      this.activeQuestion = this.activeSection.questions[0];
      this.allQuetions = res.details.data || [];
      this.allQuetions = _.map(this.allQuetions, (res) => {
        res.options = this.moduleService.questionOptions();
        return res;
      })
      this.updateIndex('question', this.activeQuestion.id)
    })
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
    this.resetPreviousSubmissionConfi();
  }

  getAnswer() {
    let answer = '';
    _.forEach(this.activeQuestion.options, (ops) => {
      let textA = _.find(ops.text, (r) => { return r.value == true; });
      if (textA) {
        answer = textA.slug;
      }
    });
    return answer;
  }

  nextQuestion() {
    let indexes = Object.assign({}, this.indexes)
    let hasNextQuestion = this.hasNext('question', ++indexes.question);
    if (hasNextQuestion) {
      let answer = this.getAnswer();
      this.saveQuestion(answer, hasNextQuestion);
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
    this.resetPreviousSubmissionConfi();
  }

  /**
   * Reset previous submission configuration
   * @type Private
   */
  private resetPreviousSubmissionConfi() {
    this.showPreviousSubmission = false;
  }

  nextChapter(chapter) {
    this.getChapterDetails(chapter);
  }

  nextSection(section) {
    this.activeChapter = this.moduleService.getChapterDetails(section.parent_id);
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

  getPreviousSubmitssion(id: any) {
    this.showPreviousSubmission = !this.showPreviousSubmission;
    this.moduleService.getPreviousSubmitssion(
      this.activeChapter.chapterId,
      this.activeSection.sectionId,
      this.activeQuestion.id
    ).subscribe( (res) => {
      console.log("respojse::", res);
      
    })  
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

  deleteAttachment(index, data: any = []) {
    this.alertService.confirm('You are about to delete this attachments!').then((response) => {
      if (response.isConfirmed) {
        if (data.length) {
          data.splice(index, 1);
        } else {
          this.previousSubmission.attachments.splice(index, 1);
        }
      }
    });
  }

  saveQuestion(answer, hasNextQuestion) {
    // this.moduleService.saveQuestion(this.activeQuestion.id, {
    //   answer: answer,
    //   remark: this.activeQuestion.remark
    // }).subscribe(() => {
      ++this.indexes.question;
      this.activeQuestion = hasNextQuestion;
    // }, () => {
    //   this.toster.error("Something went wrong!");
    // });
  }
}
