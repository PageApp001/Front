import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsService } from '../../../services/services.components/news.service';
import { AlertComponent } from '../../alert/alert.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode = false;
  newsId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<NewsFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newsForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaPublicacion: [''],
    });

    if (data) {
      this.isEditMode = data.editMode;
      if (this.isEditMode) {
        this.newsId = data.news.id;
        this.newsForm.patchValue(data.news);
      }
    }
  }

  ngOnInit(): void {
    if (!this.data) {
      this.route.params.subscribe((params) => {
        if (params['id']) {
          this.isEditMode = true;
          this.newsId = +params['id'];
          this.loadNews(this.newsId);
        }
      });
    }
  }

  loadNews(id: number): void {
    this.newsService.getNewsById(id).subscribe(
      (news: any) => {
        this.newsForm.patchValue({
          titulo: news.titulo,
          descripcion: news.descripcion,
          fechaPublicacion: news.fechaPublicacion,
        });
      },
      (error: any) => {
        console.error('Error al cargar la noticia', error);
      }
    );
  }

  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.newsForm.invalid) {
      AlertComponent.showError(
        'Error',
        'Por favor completa todos los campos requeridos.'
      );
      return; // No procede con la creación o actualización si el formulario es inválido
    }
    const formData = new FormData();
    formData.append('titulo', this.newsForm.get('titulo')?.value);
    formData.append('descripcion', this.newsForm.get('descripcion')?.value);
    formData.append(
      'fechaPublicacion',
      this.newsForm.get('fechaPublicacion')?.value
    );

    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    if (this.isEditMode && this.newsId) {
      this.newsService.updateNews(this.newsId, formData).subscribe(
        (response: any) => {
          AlertComponent.showSuccess(
            'Noticia actualizada',
            'Noticia actualizada exitosamente'
          );
          console.log('Noticia actualizada exitosamente', response);
          if (this.dialogRef) {
            this.dialogRef.close(response);
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          AlertComponent.showError('Error', 'Error al actualizar la noticia');
          console.error('Error al actualizar la noticia', error);
        }
      );
    } else {
      this.newsService.createNews(formData).subscribe(
        (response: any) => {
          AlertComponent.showSuccess(
            'Noticia creada',
            'Noticia creada exitosamente'
          );
          console.log('Noticia creada exitosamente', response);
          if (this.dialogRef) {
            this.notificationService.showNotification(
              'Nueva publicación creada',
              {
                body: 'Tu publicación ha sido creada con éxito.',
                icon: 'assets/images/logo.jpg',
              }
            );
            this.dialogRef.close(response);
          } else {
            this.router.navigate(['/']);
          }
        },

        (error: any) => {
          AlertComponent.showError('Error', 'Error al crear la noticia');
          console.error('Error al crear la noticia', error);
        }
      );
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
