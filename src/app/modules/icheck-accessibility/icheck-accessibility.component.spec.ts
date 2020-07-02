import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcheckAccessibilityComponent } from './icheck-accessibility.component';

describe('IcheckAccessibilityComponent', () => {
  let component: IcheckAccessibilityComponent;
  let fixture: ComponentFixture<IcheckAccessibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcheckAccessibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcheckAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
