import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GenerationHistory {
  id?: number;
  prompt: string;
  response: string;
  tokensUsed: number;
  createdAt?: string;
  presentation: { id: number };
}

@Injectable({
  providedIn: 'root'
})
export class GenerationHistoryService {
  private apiUrl = 'http://localhost:8081/api/generationHistory';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GenerationHistory[]> {
    return this.http.get<GenerationHistory[]>(this.apiUrl);
  }

  get(id: number): Observable<GenerationHistory> {
    return this.http.get<GenerationHistory>(`${this.apiUrl}/${id}`);
  }

  add(history: GenerationHistory): Observable<GenerationHistory> {
    return this.http.post<GenerationHistory>(this.apiUrl, history);
  }

  update(id: number, history: GenerationHistory): Observable<GenerationHistory> {
    return this.http.put<GenerationHistory>(`${this.apiUrl}/${id}`, history);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
