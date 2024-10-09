import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsService } from '../../../services/services.components/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  news: any;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const newsId = Number(this.route.snapshot.paramMap.get('id')); // Convertir a número
    this.loadNewsDetails(newsId);
  }

  getImageUrl(imageName: string): string {
    return `http://192.168.100.42:3000/uploads/${imageName}`;
  }

  loadNewsDetails(id: number): void {  // Cambiar el tipo de id a number
    if (id) {
      this.newsService.getNewsById(id).subscribe(
        (data: any) => {
          this.news = data;
        },
        (error: any) => {
          console.error('Error al obtener los detalles de la noticia', error);
        }
      );
    }
  }

  transformDescription(description: string): SafeHtml {
    const linkifiedDescription = description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #3f48cc;" >$1</a>');
    return this.sanitizer.bypassSecurityTrustHtml(linkifiedDescription);
  }
  
}
