import { Component, Input, OnInit, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Quality, QualityService } from 'src/app/services/services.components/quality.service';
import { AlertComponent } from '../../alert/alert.component';
import { InformationFormComponent } from '../information-form/information-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-information-edit',
  templateUrl: './information-edit.component.html',
  styleUrls: ['./information-edit.component.css']
})
export class InformationEditComponent implements OnInit {
  informationForm: FormGroup;
  selectedFile: File | null = null;
  informationId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private qualityService: QualityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.informationForm = this.fb.group({
      title: [''],
      description: [''],
      publicationDate: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.informationId = +params['id'];
        this.loadInformation(this.informationId);
      }
    });
  }

  loadInformation(id: number): void {
    this.qualityService.getQualityById(id).subscribe(
      (information: any) => {
        this.informationForm.patchValue({
          title: information.title,
          description: information.description,
          publicationDate: information.publicationDate
        });
      },
      (error: any) => {
        console.error('Error al cargar la información', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.informationForm.get('title')?.value);
    formData.append('description', this.informationForm.get('description')?.value);
    formData.append('publicationDate', this.informationForm.get('publicationDate')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.informationId) {
      this.qualityService.updateQuality(this.informationId, Quality).subscribe(
        (response: any) => {
          console.log('Información actualizada exitosamente', response);
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error al actualizar la información', error);
        }
      );
    }
  }
}
