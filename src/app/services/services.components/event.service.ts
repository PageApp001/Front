import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private endpoint: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
    this.apiUrl = 'event';
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, eventData);
  }

  getEvents(): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}`);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  updateEvent(id: number, eventData: any): Observable<any> {
    return this.http.put(`${this.endpoint}${this.apiUrl}/update/${id}`, eventData);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
  }
}
