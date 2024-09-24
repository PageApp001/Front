import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/services.components/event.service';
import { AlertComponent } from '../../alert/alert.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  eventsId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private notificationService: NotificationService,
    private router: Router,

    @Optional() public dialogRef: MatDialogRef<EventFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required], // Input date
      horaInicio: ['', Validators.required], // Input time
    });
  }

  ngOnInit(): void {
    
  }

  loadEvents(id: number): void {
    this.eventService.getEventById(id).subscribe(
      (event: any) => {
        this.eventForm.patchValue({
          nombre : event.nombre,
          descripcion: event.descripcion,
          fechaInicio: event.fechaInicio,
          horaInicio: event.horaInicio
        });
      },
      (error: any) => {
        console.error('Error al cargar los eventos', error);
      }
    );
  }


  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      // Convertir fechaInicio al formato adecuado (YYYY-MM-DD)
      const fechaInicio = new Date(formValue.fechaInicio);

      // Asegurarse de que se envíe correctamente con la zona horaria adecuada
      const formattedFechaInicio = fechaInicio.toISOString().split('T')[0];

      const eventData = {
        ...formValue,
        fechaInicio: formattedFechaInicio, // Actualizamos la fecha con el formato adecuado
      };

      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Event created successfully', response);
          AlertComponent.showSuccess(
            'Evento creado',
            'Evento creado exitosamente'
          );
          if (this.dialogRef) {
            this.notificationService.showNotification(
              'Nuevo evento publicado',
              {
                body: 'Tu evento ha sido creado con éxito.',
                icon: 'assets/images/logo.jpg',
              }
            );
            this.dialogRef.close(response);
          } else {
            
          }
          location.reload()
        },
        (error) => {
          AlertComponent.showError('Error', 'Error al crear el evento');
          console.error('Error creating event', error);
        }
      );
    }
  }


}
