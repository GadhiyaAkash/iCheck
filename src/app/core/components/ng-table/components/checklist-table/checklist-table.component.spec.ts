import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistTableComponent } from './checklist-table.component';

describe('ChecklistTableComponent', () => {
  let component: ChecklistTableComponent;
  let fixture: ComponentFixture<ChecklistTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
