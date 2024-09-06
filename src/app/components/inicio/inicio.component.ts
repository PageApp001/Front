import { Component } from '@angular/core';
import { UserService } from 'src/app/services/services.components/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService) {
  }

  login() {
    if (this.email === '' || this.password === '') {
      this.notificationService.showError('Todos los campos son obligatorios', '');
      return;
    }
    this.userService.login(this.email, this.password).subscribe(
      (response: any) => {
        this.notificationService.showSuccess('Ingreso exitoso','');
        const token = response.token;
        this.authService.setToken(token); // Aquí se actualiza la información del usuario
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Login failed', error);
        if (error.status === 401) {
          console.log(this.errorMessage);
          this.notificationService.showError('Correo o contraseña invalidos','')
        } else {
          AlertComponent.showError('Ocurrio un error inesperado. Por favor intenta de nuevo','')
        }
      }
    )
  }
  
  navigateToRegister() {
    this.router.navigate(['/signin'])
  }
}
