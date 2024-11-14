import { Component, EventEmitter, Input, Output } from '@angular/core';

interface FileItem {
  name: string;
  isFolder: boolean;
  contents?: FileItem[];
  file?: File;
  isOpen?: boolean;
}

@Component({
  selector: 'app-archivos-list',
  templateUrl: './archivos-list.component.html',
  styleUrls: ['./archivos-list.component.css']
})
export class ArchivosListComponent {
  @Input() folderStructure: FileItem[] = [];
  @Output() fileSelected = new EventEmitter<FileItem>();

  toggleFolder(folder: FileItem): void {
    folder.isOpen = !folder.isOpen;
  }

  selectFile(file: FileItem): void {
    this.fileSelected.emit(file);
  }
}
