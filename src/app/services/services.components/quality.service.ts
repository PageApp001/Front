import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

export interface Quality {
  id?: number;
  titulo: string;
  fechaPublicacion?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class QualityService {
  private endpoint: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
    this.apiUrl = 'quality';
  }

  createQuality(quality: Quality): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, quality);
  }

  getQuality(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}`);
  }

  getQualityById(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  updateQuality(id: number, quality: Quality): Observable<any> {
    return this.http.put(
      `${this.endpoint}${this.apiUrl}/update/${id}`,
      quality
    );
  }

  deleteQuality(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
  }
}
