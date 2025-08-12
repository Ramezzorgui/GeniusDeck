import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BriefRequest } from '../models/BriefRequest';
import { SlideContent } from '../models/SlideContent';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = 'http://localhost:8081/api/presentations/generate-structure';

  constructor(private http: HttpClient) {}

  generatePresentationStructure(request: BriefRequest): Observable<SlideContent[]> {
    return this.http.post<SlideContent[]>(this.apiUrl, request);
  }
}
