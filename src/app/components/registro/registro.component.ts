import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { NotificationService } from 'src/app/services/alert.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  apellido: string = '';
  cargo: string = '';
  dependencia: string = '';
  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService) { }

  register() {
    if (this.nombre === '' || this.apellido === '' || this.cargo === '' || this.dependencia === '' || this.email === '' || this.password === '') {
      this.notificationService.showError('', 'Todos los campos son obligatorios');
      return;
    }
    try {
      this.authService.register(this.nombre, this.apellido, this.cargo, this.dependencia, this.email, this.password).subscribe(
        (response) => {
          this.notificationService.showSuccess('Registro exitoso', 'Tu cuenta ha sido creada correctamente');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          this.notificationService.showError('Error al registrar usuario', '');
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
      AlertComponent.showError('Error inesperado', 'Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    }
  }
}
