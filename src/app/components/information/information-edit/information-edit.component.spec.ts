import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationEditComponent } from './information-edit.component';

describe('InformationEditComponent', () => {
  let component: InformationEditComponent;
  let fixture: ComponentFixture<InformationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationEditComponent]
    });
    fixture = TestBed.createComponent(InformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
