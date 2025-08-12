import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Slide {
  id?: number;
  title: string;
  content: string;
  layout: string;
  position: number;
  presentation: { id: number };
}

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private apiUrl = 'http://localhost:8081/slides';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Slide[]> {
    return this.http.get<Slide[]>(this.apiUrl);
  }

  get(id: number): Observable<Slide> {
    return this.http.get<Slide>(`${this.apiUrl}/${id}`);
  }

  add(slide: Slide): Observable<Slide> {
    return this.http.post<Slide>(this.apiUrl, slide);
  }

  update(id: number, slide: Slide): Observable<Slide> {
    return this.http.put<Slide>(`${this.apiUrl}/${id}`, slide);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
