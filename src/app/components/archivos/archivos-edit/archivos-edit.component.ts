import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService, MyFile } from 'src/app/services/services.components/file.service';

@Component({
  selector: 'app-archivos-edit',
  templateUrl: './archivos-edit.component.html',
  styleUrls: ['./archivos-edit.component.css']
})
export class ArchivosEditComponent {
  @Input() archivo: MyFile | null = null;

  constructor(private fileService: FileService) {}

  guardarCambios(): void {
    if (this.archivo && this.archivo.id) {
      this.fileService.updateFile(this.archivo.id, this.archivo).subscribe(
        () => {
          console.log('Archivo actualizado');
        },
        (error) => {
          console.error('Error al actualizar el archivo:', error);
        }
      );
    }
  }
}
