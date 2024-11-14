import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosFromComponent } from './archivos-from.component';

describe('ArchivosFromComponent', () => {
  let component: ArchivosFromComponent;
  let fixture: ComponentFixture<ArchivosFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosFromComponent]
    });
    fixture = TestBed.createComponent(ArchivosFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
