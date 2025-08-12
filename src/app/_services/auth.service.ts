import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

 login(email: string, password: string): Observable<any> {
  return this.http.post(
    AUTH_API + 'signin',
    { email, password },
    httpOptions
  ).pipe(
    tap((response: any) => {
      if (response.accessToken) {
        this.storageService.saveToken(response.accessToken); // ✅ sauvegarde token
        this.storageService.saveUser(response);               // ✅ sauvegarde user
      }
    })
  );
}


  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        name,
        email,
        password,
      },
      httpOptions
    );
  }
  forgotPassword(email: string) {
  return this.http.post('http://localhost:8081/api/auth/forgot-password', { email });
}

    resetPassword(token: string, newPassword: string): Observable<any> {
      return this.http.post<any>(`${AUTH_API}reset-password`, {
        token,
        newPassword
      }, httpOptions);
    }



  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  loginWithGoogle(idToken: string): Observable<any> {
  return this.http.post(`${AUTH_API}google`, { idToken }, httpOptions).pipe(
    tap((response: any) => {
      if (response.accessToken) {
        this.storageService.saveToken(response.accessToken); // ✅ sauvegarde token
        this.storageService.saveUser(response);               // ✅ sauvegarde user
      }
    })
  );
}
loginWithFacebookRedirect(): void {
  window.location.href = 'http://localhost:8081/oauth2/authorization/facebook';
}


}
