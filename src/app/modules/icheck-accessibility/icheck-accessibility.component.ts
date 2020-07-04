import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import * as _ from 'lodash';

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

  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.accessbilityId = this.activeRoute.snapshot.paramMap.get('id');
    this.details = this.moduleService.getIAccessbilityDetails(this.accessbilityId);

    console.log("this.details::", this.details);

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
    console.log("chapter::", chapter);
    this.activeChapter = this.moduleService.getChapterDetails(chapter.id);
    this.updateIndex('chapters', this.activeChapter.id)
    if (this.activeChapter && this.activeChapter.sections) {
      this.activeSection = this.activeChapter.sections(this.activeChapter.sections[0].id)
      this.updateIndex('sections', this.activeSection.id)
      this.transformQuestions(this.activeSection.questions)
    } else {
      this.transformQuestions(this.activeChapter.questions)
    }
    console.log("activeChapter:", this.activeChapter);
    console.log("activeSection:", this.activeSection);
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
      }
    } else {
      let hasNextChapter = this.hasNext('chapters', ++indexes.chapter);
        if (hasNextChapter) {
          this.getChapterDetails(hasNextChapter);
        }
    }
    console.log("indezxedd::", this.indexes);
  }

  nextChapter(chapter) {
    console.log("chapter:", chapter);
    this.getChapterDetails(chapter);
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
}
