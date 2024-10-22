import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent {
  files: File[] = [];
  folderStructure: string[] = [];
  archivosDeCarpeta: File[] = [];
  carpetaSeleccionada: string = '';
  archivoContenido: string | ArrayBuffer | null = '';  // Para contenido de archivos de texto
  archivoSeleccionado: File | null = null;  // Archivo actualmente seleccionado
  urlContenido: SafeResourceUrl | null = null;  // URL para visualizar archivos binarios (PDF, Word, Excel, etc.)

  constructor(private sanitizer: DomSanitizer) {}

  onFilesSelected(event: any) {
    const selectedFiles = event.target.files;
    this.files = Array.from(selectedFiles);
    this.folderStructure = [];

    this.files.forEach(file => {
      const relativePath = file.webkitRelativePath;
      const folders = relativePath.split('/').slice(0, -1);

      folders.forEach((folder, index) => {
        const folderPath = folders.slice(0, index + 1).join('/');
        if (!this.folderStructure.includes(folderPath)) {
          this.folderStructure.push(folderPath);
        }
      });
    });
  }

  mostrarArchivosDeCarpeta(folder: string) {
    this.archivosDeCarpeta = this.files.filter(file => file.webkitRelativePath.startsWith(folder + '/'));
    this.carpetaSeleccionada = folder;
  }

  verContenido(file: File) {
    console.log('Archivo seleccionado:', file);  // Verifica si se selecciona un archivo
    this.archivoSeleccionado = file;
    const reader = new FileReader();

    // Manejar archivos de texto (txt, json, etc.)
    if (this.esArchivoTexto(file)) {
      reader.onload = () => {
        this.archivoContenido = reader.result;
        this.urlContenido = null;  // Limpiar URL para contenido binario
        console.log('Contenido del archivo de texto:', this.archivoContenido); // Verifica el contenido
      };
      reader.readAsText(file);
    }
    // Manejar archivos binarios (PDF, Word, Excel, etc.)
    else {
      this.urlContenido = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
      this.archivoContenido = null;  // No necesitamos archivoContenido para archivos binarios
      console.log('URL de contenido binario:', this.urlContenido); // Verifica la URL
    }
  }

  // Método para determinar si es un archivo de texto
  esArchivoTexto(file: File): boolean {
    const tipoTexto = ['text/plain', 'application/json', 'text/csv', 'application/xml'];
    return tipoTexto.includes(file.type);
  }

  // Método para subir archivos
  uploadFiles() {
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file, file.webkitRelativePath);
    });
    formData.append('folderStructure', JSON.stringify(this.folderStructure));

    // Aquí haces la llamada HTTP para subir los archivos
    // Ejemplo:
    // this.http.post('/ruta-al-servidor', formData).subscribe(response => {
    //   console.log('Subido con éxito:', response);
    // }, error => {
    //   console.error('Error al subir:', error);
    // });
  }
}
