import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosDetailsComponent } from './archivos-details.component';

describe('ArchivosDetailsComponent', () => {
  let component: ArchivosDetailsComponent;
  let fixture: ComponentFixture<ArchivosDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosDetailsComponent]
    });
    fixture = TestBed.createComponent(ArchivosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
