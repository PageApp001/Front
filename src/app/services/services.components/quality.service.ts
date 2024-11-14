import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

export interface Quality {
  id?: number;
  titulo: string;
  fechaPublicacion?: Date;
  file?: object;
}
export interface FileItem {
  name: string;
  isFolder: boolean;
  contents?: FileItem[];
  file?: File; // Archivo en el caso de que sea un archivo (no una carpeta)
  isOpen?: boolean;
}
// las ideas son que tienen estar unidas lo ue se crea con la interfaz de quality con esto
//podemos que todo el contenido se almacene en file y con esto tal vez se guarde en la BD
//y falta organizar el back para quye se suba todo el contenido bin en uploads y se administre
//toda esa informacion guardada
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
    return this.http.put(`${this.endpoint}${this.apiUrl}/update/${id}`, quality);
  }

  deleteQuality(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}${this.apiUrl}/delete/${id}`);
  }

  uploadFolderStructure(folderStructure: FileItem[]): Observable<any> {
    // Creamos el objeto `Quality` y enviamos la estructura de carpetas como el campo `file`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    // Asegúrate de retornar el observable de la llamada HTTP
    return this.http.post(`${this.endpoint}${this.apiUrl}/upload-folder`, {folderStructure}, {headers});
  }
  
}