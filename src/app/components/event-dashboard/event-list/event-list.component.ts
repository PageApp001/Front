import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../../../services/services.components/event.service'; // Asegúrate de importar tu servicio
import { AlertComponent } from '../../alert/alert.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  @Input() events: any[] = [];

  isAdmin: boolean = false;

  constructor(private eventService: EventService,private authService : AuthService) {}

  ngOnInit(): void {
    this.loadEvents(); 
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data.event;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }
  deleteEvent(id: number): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.eventService.deleteEvent(id).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'El evento ha sido eliminado.');
              this.loadEvents();
            },
            (error: any) => {
              console.error('Error al eliminar el evento', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar el evento.');
            }
          );
        }
      });
  }
  
}
