import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      }).catch(registrationError => {
        console.log('Error al registrar el Service Worker:', registrationError);
      });
    });
  }
  