import { Component, EventEmitter, Output } from '@angular/core';
import { QualityService } from 'src/app/services/services.components/quality.service';

interface FileItem {
  name: string;
  isFolder: boolean;
  contents?: FileItem[];
  file?: File;
  isOpen?: boolean;
}

@Component({
  selector: 'app-archivos-from',
  templateUrl: './archivos-from.component.html',
  styleUrls: ['./archivos-from.component.css']
})
export class ArchivosFromComponent {
  @Output() folderSelected = new EventEmitter<FileItem[]>();

  folderStructure: FileItem[] = [];  // Variable para almacenar la estructura de carpetas seleccionada

  constructor(private qualityService: QualityService) {}

  // Método para seleccionar la carpeta
  async selectFolder(): Promise<void> {
    try {
      const directoryHandle = await (window as any).showDirectoryPicker();
      this.folderStructure = await this.buildFolderStructure(directoryHandle);  // Guardamos la estructura
      this.folderSelected.emit(this.folderStructure);  // Emitimos la estructura de carpetas seleccionada
    } catch (error) {
      console.error('Error al seleccionar carpeta:', error);
    }
  }

  // Método para construir la estructura de carpetas recursivamente
  async buildFolderStructure(directoryHandle: any): Promise<FileItem[]> {
    const items: FileItem[] = [];

    for await (const [name, handle] of directoryHandle.entries()) {
      if (handle.kind === 'directory') {
        items.push({
          name,
          isFolder: true,
          isOpen: false,
          contents: await this.buildFolderStructure(handle)
        });
      } else if (handle.kind === 'file') {
        const file = await handle.getFile();
        items.push({
          name: file.name,
          isFolder: false,
          file
        });
      }
    }

    return items;
  }

  // Método para subir la estructura de carpetas a la base de datos
  async createFile(): Promise<void> {
    try {
      if (this.folderStructure.length > 0) {
        // Llamamos al servicio para subir la estructura de carpetas
        this.qualityService.uploadFolderStructure(this.folderStructure).subscribe(
          response => {
            console.log('Estructura de carpetas subida correctamente:', response);
          },
          error => {
            console.error('Error al subir la estructura de carpetas:', error);
          }
        );
      } else {
        console.error('No se ha seleccionado ninguna carpeta');
      }
    } catch (error) {
      console.error('Error en la creación de archivo:', error);
    }
  }
}
