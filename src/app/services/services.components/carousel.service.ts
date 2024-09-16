import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class CarouselService {

    private endpoint: string;
    private apiUrl: string;

    constructor(private http: HttpClient) { 
        this.endpoint = environment.endpoint;
        this.apiUrl = 'carousel';
    }

    createCarouselImage(formData: FormData): Observable<any> {
        return this.http.post(`${this.endpoint}${this.apiUrl}/create`, formData);
    }

    getCarouselImages(): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}`);
    }

    getCarouselImageById(id: number): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
    }

    updateCarouselImage(id: number, data: any): Observable<any> {
        return this.http.put(`${this.endpoint}${this.apiUrl}/update/${id}`, data);
    }

    deleteCarouselImage(id: number): Observable<any> {
        return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
    }
}
