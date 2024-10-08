import { Component, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { BirthdaylService } from 'src/app/services/services.components/birthday.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/app/enviroments/enviroment';

@Component({
  selector: 'app-birthday-images',
  templateUrl: './birthday-images.component.html',
  styleUrls: ['./birthday-images.component.css'],
})
export class BirthdayImagesComponent implements OnInit {
  imagenes: { id: number; imagen: string }[] = [];
  isAdmin: boolean = false;

  endpointImage:string;

  constructor(
    private birthdayService: BirthdaylService,
    private authService: AuthService
  ) {this.endpointImage = environment.endpointImage}

  ngOnInit(): void {
    this.loadBirthday();
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  loadBirthday() {
    this.birthdayService.getBirthdayImages().subscribe((data) => {
      if (Array.isArray(data)) {
        this.imagenes = data;
      } else {
        console.error('La respuesta no es un array:', data);
      }
    });
  }
  removeImage(id: number): void {
    console.log(`Eliminando imagen con ID: ${id}`);
    AlertComponent.showWarning(
      '¿Estás seguro?',
      '¡No podrás revertir esto!'
    ).then((result) => {
      if (result.isConfirmed) {
        this.birthdayService.deleteBirthdayImage(id).subscribe(
          () => {
            console.log(`Imagen con ID: ${id} eliminada correctamente`);
            AlertComponent.showSuccess(
              '¡Eliminado!',
              'La imagen ha sido eliminada.'
            );
            this.loadBirthday(); // Recargar las imágenes después de eliminar una
          },
          (error: any) => {
            console.log(error);

            console.error('Error al eliminar la imagen', error);
            AlertComponent.showError(
              'Error',
              'Hubo un problema al intentar eliminar la imagen.'
            );
          }
        );
      }
    });
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('image', file);

      this.birthdayService.createBirthdayImage(formData).subscribe(() => {
        this.ngOnInit(); // Recargar las imágenes después de subir una nueva
      });
    }
  }

  getImageUrl(imageName: string): string {
    return `${this.endpointImage}${imageName}`;
  }
}
