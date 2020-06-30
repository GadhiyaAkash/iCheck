import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainedBoxComponent } from './contained-box.component';

describe('ContainedBoxComponent', () => {
  let component: ContainedBoxComponent;
  let fixture: ComponentFixture<ContainedBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainedBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
