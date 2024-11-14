import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

// Interfaz renombrada para evitar conflictos
export interface MyFile {
  id?: number;
  name: string;
  parent_id?: number;
  is_folder: boolean;
  file_path?: string;
  file_type?: string;
  size?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private endpoint: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
    this.apiUrl = 'file'; // Asegúrate de que esto termina con una barra si es necesario
  }


  // Crear un archivo o carpeta
  createFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // Asegúrate de que `file` sea un objeto File real

    return this.http.post(`${this.endpoint}${this.apiUrl}/create`, formData);
  }

  // Obtener todos los archivos y carpetas
  getFiles(): Observable<MyFile[]> {
    return this.http.get<MyFile[]>(`${this.endpoint}${this.apiUrl}`);
  }

  // Obtener un archivo o carpeta por ID
  getFileById(id: number): Observable<MyFile> {
    return this.http.get<MyFile>(`${this.endpoint}${this.apiUrl}/${id}`);
  }

  // Actualizar archivo o carpeta
  updateFile(id: number, file: MyFile): Observable<any> {
    return this.http.put(`${this.endpoint}${this.apiUrl}/update/${id}`, file);
  }

  // Eliminar archivo o carpeta
  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
  }
}
