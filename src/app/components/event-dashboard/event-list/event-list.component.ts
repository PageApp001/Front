import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/services.components/event.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: any[] = []; // Aquí almacenaremos los eventos

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents(); // Cargar eventos cuando el componente inicie
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data.event; // Ajusta esto según la estructura de respuesta
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }
}
