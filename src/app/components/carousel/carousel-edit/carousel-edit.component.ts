import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/services.components/carousel.service';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-carousel-edit',
  templateUrl: './carousel-edit.component.html',
  styleUrls: ['./carousel-edit.component.css']
})
export class CarouselEditComponent implements OnInit {
  images: { id: number; imagen: string, link: string }[] = [];
  newImageLink: string = '';

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    // Cargar imágenes desde la API al inicializar el componente
    this.carouselService.getCarouselImages().subscribe((data) => {
      this.images = data;
    });
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/uploads/${imageName}`;
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
      formData.append('link', this.newImageLink);

      this.carouselService.createCarouselImage(formData).subscribe(() => {
        this.ngOnInit(); // Recargar las imágenes después de subir una nueva
      });
    }
  }

  removeImage(id: number): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.carouselService.deleteCarouselImage(id).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'La imagen ha sido eliminada.');
              this.ngOnInit(); // Recargar las imágenes después de eliminar una
            },
            (error: any) => {
              console.error('Error al eliminar la imagen', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar la imagen.');
            }
          );
        }
      });

  }

  updateImageLink(id: number, link: string) {
    const formData = { link }; 
  
    this.carouselService.updateCarouselImage(id, formData).subscribe(() => {
      this.ngOnInit(); // Recargar las imágenes después de actualizar el link
    });
  }
  
  
}
