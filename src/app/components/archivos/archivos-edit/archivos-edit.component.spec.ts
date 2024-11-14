import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosEditComponent } from './archivos-edit.component';

describe('ArchivosEditComponent', () => {
  let component: ArchivosEditComponent;
  let fixture: ComponentFixture<ArchivosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosEditComponent]
    });
    fixture = TestBed.createComponent(ArchivosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
