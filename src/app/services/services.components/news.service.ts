import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private endpoint: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
    this.apiUrl = 'news';
  }

  createNews(formData: FormData): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, formData);
  }

  getNews(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}`);
  }

  getNewsById(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  updateNews(id: number, formData: FormData): Observable<any> {
    return this.http.put(
      `${this.endpoint}${this.apiUrl}/update/${id}`,
      formData
    );
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
  }
}
