import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component';
import { EventService } from 'src/app/services/services.components/event.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css'],
})
export class EventDashboardComponent implements OnInit {
  events: any[] = [];
  constructor(public dialog: MatDialog, private eventService : EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }
  loadEvents(): void {
    
    this.eventService.getEvents().subscribe(
      (data: any[]) => {
        
        this.events = data;
      },
      (error: any) => {
        console.error('Error al obtener las noticias', error);
        AlertComponent.showError('Error', 'Error al obtener las noticias');
      }
    );
  }
  openDialog(event: any = null): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '600px',
      data: {
        event: event
          ? { ...event }
          : { nombre: '', descripcion: '', fechaInicio: '', horaInicio: '', fechaPublicacion:''},
        // editMode: !!event,
      },
      
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEvents(); // Asegurarse de cargar las noticias después de cerrar el diálogo
      }
    });
  }
}
