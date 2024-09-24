import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint, 
    this.apiUrl = 'user';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}${this.apiUrl}/create`, user);
  }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.endpoint}${this.apiUrl}`, { headers });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${email}`);
  }

  updateUser(email: string, user: any): Observable<any> {
    return this.http.put<any>(
      `${this.endpoint}${this.apiUrl}/update/${email}`,
      user
    );
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${email}`);
  }
}
