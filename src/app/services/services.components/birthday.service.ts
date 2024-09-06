import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/app/enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class BirthdaylService {

    private endpoint: string;
    private apiUrl: string;

    constructor(private http: HttpClient) { 
        this.endpoint = enviroment.endpoint
        this.apiUrl = 'birthday';
    }

    createBirthdayImage(formData: FormData): Observable<any> {
        return this.http.post(`${this.endpoint}${this.apiUrl}/create`, formData);
    }

    getBirthdayImages(): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}`);
    }

    getBirthdayImageById(id: number): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
    }

    deleteBirthdayImage(id: number): Observable<any> {
        return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
    }
}
