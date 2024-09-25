import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/AuthResponse'
import { jwtDecode } from 'jwt-decode';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private endpoint:string;


  private userInfoSubject = new BehaviorSubject<any>(null);
  userInfo$ = this.userInfoSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setUserInfo(token);
    }
    this.endpoint = environment.endpoint
  }
  private setUserInfo(token: string) {
    const decodedToken: any = jwtDecode(token);
    const userInfo = {
      nombre: decodedToken.UserInfo.nombre,
      apellido: decodedToken.UserInfo.apellido
    };
    this.userInfoSubject.next(userInfo);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userInfoSubject.next(null);
  }

  register(nombre: string, apellido: string, cargo: string, dependencia: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.endpoint}/user/create`, { nombre, apellido, cargo, dependencia, email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.setUserInfo(token);
  }

  getUserRole(): string | null {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      // Decodificar el token JWT para obtener los datos del usuario, como el rol
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.UserInfo.role;
    }
    return null;
  }

  getUserInfo(): { nombre: string, apellido: string } | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.UserInfo) {
          return { nombre: decodedToken.UserInfo.nombre, apellido: decodedToken.UserInfo.apellido };
        } else {
          console.error('El token no contiene los campos UserInfo, nombre y apellido.');
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró token en el almacenamiento local.');
    }
    return null;
  }

}
