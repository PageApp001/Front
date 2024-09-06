import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { enviroment } from "src/app/enviroments/enviroment";

@Injectable({
    providedIn: 'root'
})
export class LinkService {

    private endpoint: string;
    private apiUrl: string;
    
    constructor(private http: HttpClient) { 
        this.endpoint = enviroment.endpoint
        this.apiUrl = 'link';
    }

    createLink(linkData: { nombre: string; url: string }): Observable<any> {
        return this.http.post(`${this.endpoint}${this.apiUrl}/create`, linkData);
    }

    getLinks(): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}`);
    }

    getLinkById(id: number): Observable<any> {
        return this.http.get(`${this.endpoint}${this.apiUrl}/${id}`);
    }

    updateLink(id: number, formData: FormData): Observable<any> {
        return this.http.put(`${this.endpoint}${this.apiUrl}/update/${id}`, formData);
    }

    deleteLink(id: number): Observable<any> {
        return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
    }

}