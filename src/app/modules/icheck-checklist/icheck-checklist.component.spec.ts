import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcheckChecklistComponent } from './icheck-checklist.component';

describe('IcheckChecklistComponent', () => {
  let component: IcheckChecklistComponent;
  let fixture: ComponentFixture<IcheckChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcheckChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcheckChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
