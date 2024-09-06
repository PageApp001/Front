import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from '../../services/services.components/news.service';
import { NewsFormComponent } from './news-form/news-form.component';
import { AlertComponent } from '../alert/alert.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit {
  newsList: any[] = [];
  isAdmin: boolean = false

  constructor(private newsService: NewsService,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadNews();
    // Verifica si el usuario tiene el rol de administrador al inicializar el componente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loadNews(): void {
    
    this.newsService.getNews().subscribe(
      (data: any[]) => {
        
        this.newsList = data;
      },
      (error: any) => {
        console.error('Error al obtener las noticias', error);
        AlertComponent.showError('Error', 'Error al obtener las noticias');
      }
    );
  }

  openDialog(news: any = null): void {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      width: '500px',
      data: {
        news: news ? { ...news } : { titulo: '', descripcion: '', fechaPublicacion: '', imagen: null },
        editMode: !!news
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadNews();  // Asegurarse de cargar las noticias después de cerrar el diálogo
      }
    });
  }

  deleteNews(id: number): void {
    AlertComponent.showWarning('¿Estás seguro?', '¡No podrás revertir esto!')
      .then((result) => {
        if (result.isConfirmed) {
          this.newsService.deleteNews(id).subscribe(
            () => {
              AlertComponent.showSuccess('¡Eliminado!', 'La noticia ha sido eliminada.');
              this.loadNews();
            },
            (error: any) => {
              console.error('Error al eliminar noticia', error);
              AlertComponent.showError('Error', 'Hubo un problema al intentar eliminar la noticia.');
            }
          );
        }
      });
  }
}
