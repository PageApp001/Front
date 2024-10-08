import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../alert/alert.component';
import { NewsService } from '../../../services/services.components/news.service';
import { NewsFormComponent } from '../news-form/news-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/app/enviroments/enviroment';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  @Input() newsList: any[] = [];
  isAdmin: boolean = false;
  selectedNews: any = null;

  endpointImage:string;

  constructor(
    private newsService: NewsService,
    public dialog: MatDialog,
    private authService: AuthService
  ) { this.endpointImage = environment.endpointImage}

  ngOnInit(): void {
    // Verifica si el usuario tiene el rol de administrador al inicializar el componente
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'admin';
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

  getImageUrl(imageName: string): string {
    return `${this.endpointImage}${imageName}`;
  }

  editNews(news: any): void {
    const dialogRef = this.dialog.open(NewsFormComponent, {
      width: '600px',
      data: {
        news: news,
        editMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadNews();
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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
