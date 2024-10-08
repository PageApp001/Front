import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarouselService } from 'src/app/services/services.components/carousel.service';
import { environment } from 'src/app/enviroments/enviroment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carousel: { imagen: string, link: string }[] = [];
  isAdmin: boolean = false;

  endpointImage:string;

  constructor(
    private authService: AuthService,
    private carouselService: CarouselService,
    private router : Router

  ) { this.endpointImage = environment.endpointImage}

  ngOnInit() {
    // Cargar imágenes desde la API al inicializar el componente
    this.loadCarousel();
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  loadCarousel() {
    this.carouselService.getCarouselImages().subscribe(
      (data: any[]) => {
        this.carousel = data;
      },
      (error: any) => {
        console.error('Error al obtener las imagenes', error);
      }
    );
  }

  getImageUrl(imageName: string): string {
    return `${this.endpointImage}${imageName}`;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
