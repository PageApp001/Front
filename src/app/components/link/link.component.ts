import { Component, Input, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/services.components/link.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddLinkComponent } from './add-link/add-link.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  isAdmin: boolean = false;
  isEditor: boolean = false;
  @Input() link: any[] = [];

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private linkService: LinkService
  ) { }

  ngOnInit(): void {
    this.loadLinks();
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
    this.isEditor = userRole === 'editor';
  }

  openAddLinkDialog(): void {
    const dialogRef = this.dialog.open(AddLinkComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.link.push(result);
        this.loadLinks()
      }
    });
  }

  deleteLink(id: number): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.linkService.deleteLink(id).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'La noticia ha sido eliminada.');
              this.loadLinks();
            },
            (error: any) => {
              console.error('Error al eliminar noticia', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar la noticia.');
            }
          );
        }
      });
  }

  loadLinks() {
    this.linkService.getLinks().subscribe(
      (data: any[]) => {
        this.link = data;
      },
      (error: any) => {
        console.error('Error al obtener los link', error);

      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
