import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor() {
        this.requestPermission();
    }

    private requestPermission() {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permiso para notificaciones concedido');
                }
            });
        }
    }

    public showNotification(title: string, options?: NotificationOptions) {
        if ('Notification' in window && Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, options);
            });
        }
    }
}
