import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  id?: number;
  username: string;
  content: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = 'http://localhost:8081/api/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  getLatest() {
  return this.http.get<any[]>('http://localhost:8081/api/comments/latest');
}

getAllCommentsForAdmin(): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.apiUrl}/admin/comments`);
}

}
