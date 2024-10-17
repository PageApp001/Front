import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {
  constructor( private router: Router) {}
  navigateToMision() {
    this.router.navigate(['/mision']); // Nueva función para navegar a /information
  }
  navigateToVision() {
    this.router.navigate(['/vision']); // Nueva función para navegar a /information
  }
  navigateToValores() {
    this.router.navigate(['/valores']); // Nueva función para navegar a /information
  }
  navigateToMapa() {
    this.router.navigate(['/mapa']); // Nueva función para navegar a /information
  }
  navigateToPoliticas() {
    this.router.navigate(['/politicas']); // Nueva función para navegar a /information
  }
}
