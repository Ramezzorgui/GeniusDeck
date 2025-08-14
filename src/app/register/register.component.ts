import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    name: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private auth: Auth) { }

  onSubmit(): void {
    const { name, email, password } = this.form;

    console.log('Valeurs envoyées :', this.form);

    this.authService.register(name, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.router.navigate(['/login']);

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  signUpWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(this.auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Utilisateur connecté avec Google:', user);
      this.router.navigate(['/']); // ou autre redirection
    })
    .catch((error) => {
      console.error('Erreur de connexion Google:', error);
    });
}

}
