import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  nombre: string | null = '';
  apellido: string | null = '';
  email: string = '';
  password: string = '';

  showLoginButton: boolean = true;
  showBackButton: boolean = true;

  currentTime: string = '';
  currentDate: string = '';

  // Lista de rutas donde se oculta el botón de ingresar
  rutasOcultarBotonLogin: string[] = [
    '/login',
    '/signin',
    '/event-dashboard',
    '/details-news/:id',
  ];
  rutasConId: string[] = ['/news']; // Rutas que tienen un ID dinámico

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el botón de ingresar en la ruta de login
        // Verifica si la URL actual está en la lista de rutas específicas o es una ruta con un ID dinámico
        this.showLoginButton = !this.shouldHideButton(event.url);
        this.showBackButton = event.url !== '/';
      }
    });

    this.authService.userInfo$.subscribe((userInfo) => {
      if (userInfo) {
        this.nombre = userInfo.nombre;
        this.apellido = userInfo.apellido;
      } else {
        this.nombre = null;
        this.apellido = null;
      }
    });

    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000);
  }

  shouldHideButton(url: string): boolean {
    // Comprobar si la URL está en las rutas estáticas
    if (this.rutasOcultarBotonLogin.includes(url)) {
      return true;
    }

    // Comprobar si la URL comienza con alguna de las rutas dinámicas (que tienen un ID)
    for (let ruta of this.rutasConId) {
      if (url.startsWith(ruta)) {
        return true;
      }
    }

    return false;
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Ingreso exitoso:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }

  // reloj -----------------
  updateTimeAndDate(): void {
    const date = new Date();

    // Formato de tiempo
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    this.currentTime = `${hours}:${minutes}:${seconds}`;

    // Nombres de los meses
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    // Formato de fecha
    const day = this.padZero(date.getDate());
    const month = monthNames[date.getMonth()]; // Obtener el nombre del mes
    const year = date.getFullYear();
    this.currentDate = `${day} de ${month} de ${year}`;
  }

  padZero(unit: number): string {
    return unit < 10 ? `0${unit}` : `${unit}`;
  }
  // ----------------------

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }
  navigateRegister() {
    this.router.navigate(['/signin']);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  back() {
    this.router.navigate(['./']);
  }
}
