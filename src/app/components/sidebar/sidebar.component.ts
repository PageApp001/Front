import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verifica si el usuario tiene el rol de administrador al inicializar el componente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  navigateToLogin() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin-dashboard']);
  }

  navigateToEvents() {
    this.router.navigate(['/event-dashboard']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
