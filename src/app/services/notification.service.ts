import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de tener importado HttpClient

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public VAPID_PUBLIC_KEY = 'BCxp2qm_2N3JP9dDgFGMA4xzWcvNiP5XAHtadDI4tVGz025nStzSS7ho2JZm0wn09URlZnNxkncAJomRM_P';

  constructor(private https: HttpClient) {}

  askPermission() {
    console.log('Solicitando permiso de notificaciones...');
    return new Promise((resolve, reject) => {
      const permissionResult = Notification.requestPermission((result) => {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then((permissionResult) => {
      if (permissionResult !== 'granted') {
        console.warn('Permiso de notificaciones no fue concedido.');
        throw new Error('Permiso para notificaciones no fue otorgado.');
      } else {
        console.log('Permiso concedido para notificaciones.');
      }
    });
  }

  subscribeToNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
          })
          .then((subscription) => {
            console.log('Usuario suscrito:', subscription);
            this.sendSubscriptionToServer(subscription);
          })
          .catch((error) => {
            console.error('Error al suscribirse a las notificaciones', error);
          });
      });
    }
  }

  private sendSubscriptionToServer(subscription: PushSubscription) {
    // Aquí harías la llamada HTTP a tu backend para guardar la suscripción
    this.https.post('http://192.168.100.42:3000/api/subscribe', subscription).subscribe(
      (response) => console.log('Suscripción guardada en el servidor', response),
      (error) => console.error('Error al enviar la suscripción al servidor', error)
    );
  }

  showNotification(title: string, options?: NotificationOptions) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    }
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }
}
