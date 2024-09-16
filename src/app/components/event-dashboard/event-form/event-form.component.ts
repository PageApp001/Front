import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../services/services.components/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {
    this.eventForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required], // Input date
      horaInicio: ['', Validators.required], // Input time
    });
  }

  ngOnInit(): void {}

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
        },
        (error) => {
          console.error('Error creating event', error);
        }
      );
    }
  }
}
