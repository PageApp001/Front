import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker'; // Importamos SwPush para manejar las notificaciones push
import { HttpClient } from '@angular/common/http'; // HttpClient para hacer peticiones HTTP

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Clave pública de VAPID
  private readonly key = 'BCxp2qm_2N3JP9dDgFGMA4xzWcvNiP5XAHtadDI4tVGz025nStzSS7ho2JZm0wn09URlZnNxkncAJomRM_P--WU'; 

  constructor(private swPush: SwPush, private http: HttpClient) {
    this.requestPermission();
  }

  // Solicitar permiso al usuario para notificaciones
  private requestPermission() {
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.key
      })
      .then(subscription => {
        console.log('Suscripción exitosa:', subscription);
        this.sendSubscriptionToServer(subscription);
      })
      .catch(err => console.error('Error en la suscripción:', err));
    } else {
      console.log('Notificaciones Push no están habilitadas');
    }
  }

  private sendSubscriptionToServer(subscription: PushSubscription) {
    this.http.post('/api/notification', subscription).subscribe(
      response => console.log('Suscripción almacenada en el servidor', response),
      error => console.error('Error al enviar suscripción al servidor', error)
    );
  }

  // Mostrar la notificación manualmente 
  public showNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
      });
    }
  }
}
