import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nombre: string | null = '';
  apellido: string | null = '';
  email: string = '';
  password: string = '';
  showLoginButton: boolean = true;



  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Oculta el botón de ingresar en la ruta de login
        this.showLoginButton = event.url !== '/login';

      }
    });

    this.authService.userInfo$.subscribe(userInfo => {
      if (userInfo) {
        this.nombre = userInfo.nombre;
        this.apellido = userInfo.apellido;
      } else {
        this.nombre = null;
        this.apellido = null;
      }
    });
  
  }


  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isHomeRoute(): boolean {
    return this.router.url === '/home';
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
    this.router.navigate(['/home'])
  }

  back(){
    this.router.navigate(['./'])
  }


}



