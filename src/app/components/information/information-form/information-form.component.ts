import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Quality, QualityService } from 'src/app/services/services.components/quality.service';
import { AlertComponent } from '../../alert/alert.component';


@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.css']
})
export class InformationFormComponent {
  informationForm: FormGroup;
  editMode: boolean;

  constructor(
    private fb: FormBuilder,
    private informationService: QualityService,
    private dialogRef: MatDialogRef<InformationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { information: Quality, editMode: boolean },
    private router: Router
  ) {
    this.informationForm = this.fb.group({
      titulo: ['', Validators.required],
      fechaPublicacion: [''],
    });
    this.editMode = data.editMode; // Establece el modo de edición
  }

  ngOnInit(): void {
    if (this.editMode && this.data.information) {
      this.informationForm.patchValue({
        titulo: this.data.information.titulo,
        fechaPublicacion: this.data.information.fechaPublicacion,
      });
    }
  }

  onSubmit(): void {
    if (this.informationForm.invalid) {
      return;
    }

    const informationData: Quality = {
      titulo: this.informationForm.get('titulo')?.value,
      fechaPublicacion: this.informationForm.get('fechaPublicacion')?.value
    };

    if (this.editMode && this.data.information.id) {
      this.updateQuality(this.data.information.id, informationData);
    } else {
      this.createQuality(informationData);
    }
  }

  createQuality(quality: Quality): void {
    this.informationService.createQuality(quality).subscribe(
      (response: any) => {
        AlertComponent.showSuccess('¡Éxito!', 'Información creada exitosamente');
        this.dialogRef.close(true); // Cierra el diálogo y pasa true para refrescar la lista
      },
      (error: any) => {
        console.error('Error al crear la información', error);
        AlertComponent.showError('Error', 'Hubo un problema al crear la información.');
      }
    );
  }

  updateQuality(id: number, quality: Quality): void {
    this.informationService.updateQuality(id, quality).subscribe(
      (response: any) => {
        AlertComponent.showSuccess('¡Éxito!', 'Información actualizada exitosamente');
        this.dialogRef.close(true); // Cierra el diálogo y pasa true para refrescar la lista
      },
      (error: any) => {
        console.error('Error al actualizar la información', error);
        AlertComponent.showError('Error', 'Hubo un problema al actualizar la información.');
      }
    );
  }
}
