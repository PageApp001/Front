import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/login`, { email, password });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/create`, user);
  }

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${email}`);
  }

  updateUser(email: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/update/${email}`, user);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/delete/${email}`)
  }
}


