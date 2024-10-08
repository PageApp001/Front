import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'intranet';

  constructor(private router: Router) {}

  // Verifica si la ruta actual es '/home'
  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }
}
