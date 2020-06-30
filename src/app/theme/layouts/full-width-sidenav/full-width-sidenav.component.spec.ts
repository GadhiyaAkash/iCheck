import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWidthSidenavComponent } from './full-width-sidenav.component';

describe('FullWidthSidenavComponent', () => {
  let component: FullWidthSidenavComponent;
  let fixture: ComponentFixture<FullWidthSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWidthSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWidthSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
