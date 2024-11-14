import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archivos-details',
  templateUrl: './archivos-details.component.html',
  styleUrls: ['./archivos-details.component.css']
})
export class ArchivosDetailsComponent {
  @Input() fileContent: string | null = null;
}
