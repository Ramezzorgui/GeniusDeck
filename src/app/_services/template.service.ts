import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/templates';

export interface Template {
  id?: number;
  name: string;
  category: string;
  structure: string;
  styles: string;
  isPublic: boolean;
  createdBy?: any;
  previewImage?: string;
  mainColor?: string;
  parsedColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Template[]> {
    return this.http.get<Template[]>(API_URL);
  }

  get(id: number): Observable<Template> {
    return this.http.get<Template>(`${API_URL}/${id}`);
  }

  create(data: Template): Observable<Template> {
    return this.http.post<Template>(API_URL, data);
  }

  update(id: number, data: Template): Observable<Template> {
    return this.http.put<Template>(`${API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
