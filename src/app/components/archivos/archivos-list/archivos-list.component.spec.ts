import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosListComponent } from './archivos-list.component';

describe('ArchivosListComponent', () => {
  let component: ArchivosListComponent;
  let fixture: ComponentFixture<ArchivosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivosListComponent]
    });
    fixture = TestBed.createComponent(ArchivosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
