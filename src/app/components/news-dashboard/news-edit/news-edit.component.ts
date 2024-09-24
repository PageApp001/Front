import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../services/services.components/news.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  newsForm: FormGroup;
  selectedFile: File | null = null;
  newsId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
  
  ) {
    this.newsForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      fechaPublicacion: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.newsId = +params['id'];
        this.loadNews(this.newsId);
      }
    });
  }

  loadNews(id: number): void {
    this.newsService.getNewsById(id).subscribe(
      (news: any) => {
        this.newsForm.patchValue({
          titulo: news.titulo,
          descripcion: news.descripcion,
          fechaPublicacion: news.fechaPublicacion
        });
      },
      (error: any) => {
        console.error('Error al cargar la noticia', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('titulo', this.newsForm.get('titulo')?.value);
    formData.append('descripcion', this.newsForm.get('descripcion')?.value);
    formData.append('fechaPublicacion', this.newsForm.get('fechaPublicacion')?.value);

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    if (this.newsId) {
      this.newsService.updateNews(this.newsId, formData).subscribe(
        (response: any) => {
          console.log('Noticia actualizada exitosamente', response);
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error al actualizar la noticia', error);
        }
      );
    }
  }
}
