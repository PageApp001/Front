import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'intranet';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}
  
  // Verifica si la ruta actual es '/home'
  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }

  ngOnInit() {
    this.notificationService.askPermission();
    this.registerServiceWorker();
    // Puedes mostrar una notificación de prueba aquí:
    // this.showTestNotification();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('Service Worker registrado con éxito:', registration);
          this.notificationService.askPermission();
        }).catch(error => {
          console.log('Error al registrar el Service Worker:', error);
        });
      });
    }
  }
  // showTestNotification() {
  //   this.notificationService.showNotification('Bienvenido!', {
  //     body: 'Esta es una notificación de prueba.',
  //     icon: 'path/to/icon.png' // Ajusta la ruta a un ícono si lo deseas
  //   });
  // }
}
