import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Quality, QualityService } from 'src/app/services/services.components/quality.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { InformationFormComponent } from './information-form/information-form.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent{
  informationList: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private qualityService: QualityService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuality();
    // Verifica si el usuario tiene el rol de administrador al inicializar el componente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loadQuality(): void {
    this.qualityService.getQuality().subscribe(
      (data: any[]) => {
        console.log('Quality data loaded:', data);  // Verifica los datos aquí
        this.informationList = data;
      },
      (error: any) => {
        console.error('Error al obtener la calidad', error);
        AlertComponent.showError('Error', 'Error al obtener la calidad');
      }
    );
  }
  

  openDialog(info: any = null): void {
    const dialogRef = this.dialog.open(InformationFormComponent, {
      width: '500px',
      data: {
        information: info ? { ...info } : { titulo: ''},
        editMode: !!info
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQuality();
      }
    });
  }

  deleteInformation(id: number): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.qualityService.deleteQuality(id).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'La información ha sido eliminada.');
              this.loadQuality();
            },
            (error: any) => {
              console.error('Error al eliminar información', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar la información.');
            }
          );
        }
      });
  }
  navigateToArchivos(){
    this.router.navigate(['/archivos']);
  }


}
