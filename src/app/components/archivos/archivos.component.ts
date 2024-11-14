import { Component } from '@angular/core';
import { QualityService } from 'src/app/services/services.components/quality.service';

interface FileItem {
  name: string;
  isFolder: boolean;
  contents?: any;
  file?: File;
  isOpen?: boolean;
}

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent {
//   folderStructure: FileItem[] = [];
//   fileContent: string | null = null;

//   constructor(private qualityService: QualityService) {}

//   // Seleccionar una carpeta desde el sistema de archivos
//   async selectFolder(): Promise<void> {
//     try {
//       const directoryHandle = await (window as any).showDirectoryPicker();
//       this.folderStructure = await this.buildFolderStructure(directoryHandle);
//     } catch (error) {
//       console.error('Error al seleccionar carpeta:', error);
//     }
//   }

//   // Construir la estructura de la carpeta seleccionada de forma recursiva
//   async buildFolderStructure(directoryHandle: any): Promise<FileItem[]> {
//     const items: FileItem[] = [];

//     for await (const [name, handle] of directoryHandle.entries()) {
//       if (handle.kind === 'directory') {
//         items.push({
//           name,
//           isFolder: true,
//           isOpen: false,
//           contents: await this.buildFolderStructure(handle)
//         });
//       } else if (handle.kind === 'file') {
//         const file = await handle.getFile();
//         items.push({
//           name: file.name,
//           isFolder: false,
//           file
//         });
//       }
//     }

//     return items;
//   }

//   // Alternar la visibilidad de las subcarpetas
//   toggleFolder(folder: FileItem): void {
//     folder.isOpen = !folder.isOpen;
//   }

//   // Mostrar el contenido del archivo seleccionado
//   async displayFileContent(fileItem: FileItem): Promise<void> {
//     if (fileItem.file) {
//       const text = await fileItem.file.text();
//       this.fileContent = text;
//     }
//   }

//   // Subir la estructura de carpetas y archivos al backend
//  uploadFolder(): void {
//     this.qualityService.uploadFolderStructure(this.folderStructure).subscribe({
//       next: (response: any) => {
//         console.log('Carpeta subida exitosamente:', response);
//         alert('Carpeta subida exitosamente.');
//       },
//       error: (error: any) => {
//         console.error('Error al subir la carpeta:', error);
//         alert('Error al subir la carpeta.');
//       }
//     });
//   }

folderStructure: FileItem[] = [];
fileContent: string | null = null;

onFolderSelected(folderStructure: FileItem[]): void {
  this.folderStructure = folderStructure;
}

onFileSelected(file: FileItem): void {
  if (file.file) {
    file.file.text().then(content => {
      this.fileContent = content;
    });
  } else {
    this.fileContent = null;
  }
}
}
