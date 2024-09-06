import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDashboardComponent } from './news-dashboard.component';

describe('NewsDashboardComponent', () => {
  let component: NewsDashboardComponent;
  let fixture: ComponentFixture<NewsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDashboardComponent]
    });
    fixture = TestBed.createComponent(NewsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
