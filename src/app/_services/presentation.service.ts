import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:8081/api/presentations';

// Interface pour les slides (nouvelle )
export interface Slide {
  id: number;
  position: number;
  title: string;
  content: string;
  layout: string;
}

// Interface mise à jour pour correspondre à votre API backend
export interface Presentation {
  id?: number;
  title: string;
  description?: string;  // Optionnel comme dans votre backend
  content?: string;
  settings?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: any;
  template?: any;
  slides?: Slide[];  // Ajout des slides
}

// Interface pour la requête de génération (nouvelle)
export interface PresentationGenerateRequest {
  title: string;
  content: string;
  description?: string;
  settings?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  constructor(private http: HttpClient ) {}

  getAll(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(API_URL )
      .pipe(catchError(this.handleError));
  }

  get(id: number): Observable<Presentation> {
    return this.http.get<Presentation>(`${API_URL}/${id}` )
      .pipe(catchError(this.handleError));
  }

  create(data: Presentation): Observable<Presentation> {
    return this.http.post<Presentation>(API_URL, data )
      .pipe(catchError(this.handleError));
  }

  update(id: number, data: Presentation): Observable<Presentation> {
    return this.http.put<Presentation>(`${API_URL}/${id}`, data )
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}` )
      .pipe(catchError(this.handleError));
  }

  getAllPresentationsForCurrentUser(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(`${API_URL}/me` )
      .pipe(catchError(this.handleError));
  }

  // ✅ NOUVELLE MÉTHODE pour la génération de présentation
  generatePresentation(request: PresentationGenerateRequest): Observable<Presentation> {
    return this.http.post<Presentation>(`${API_URL}/generate`, request )
      .pipe(catchError(this.handleError));
  }

  // Méthode de gestion d'erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Données invalides. Vérifiez les champs requis.';
          break;
        case 500:
          errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Erreur API:', error);
    return throwError(() => errorMessage);
  }


  generateStructure(brief: any): Observable<Slide[]> {
    return this.http.post<Slide[]>(`${API_URL}/generate-structure`, brief);
  }

  getPresentationsCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${API_URL}/count`)
  .pipe(catchError(this.handleError));
  }

}
