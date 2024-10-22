import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationLisComponent } from './information-lis.component';

describe('InformationLisComponent', () => {
  let component: InformationLisComponent;
  let fixture: ComponentFixture<InformationLisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationLisComponent]
    });
    fixture = TestBed.createComponent(InformationLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
