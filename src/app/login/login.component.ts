import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles || [];
      this.redirectByRole();
    }
  }

onSubmit(): void {
  const { username, password } = this.form;

  this.authService.login(username, password).subscribe({
    next: data => {
      this.storageService.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles || [];
      this.redirectByRole();
    },
    error: err => {
      if (err.status === 403) {
        // Compte bloqué
        this.errorMessage = "Ce compte est bloqué. Veuillez contacter l'administrateur.";
      } else {
        this.errorMessage = err.error?.message || 'Erreur lors de la connexion.';
      }
      this.isLoginFailed = true;
    }
  });
}

  redirectByRole(): void {
    if (!this.roles || this.roles.length === 0) {
      this.router.navigate(['/']).then(() => window.location.reload());
      return;
    }

    if (this.roles.includes('ADMIN')) {
      this.router.navigate(['/dashboard1']).then(() => window.location.reload());
    } else if (this.roles.includes('USER')) {
      this.router.navigate(['/home']).then(() => window.location.reload());
    } else {
      this.router.navigate(['/']).then(() => window.location.reload());
    }
  }


  reloadPage(): void {
    window.location.reload();
  }

  signInWithGoogle(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken(); // Récupère le token Firebase

        // Envoyer le token au backend pour authentification
        this.authService.loginWithGoogle(idToken).subscribe({
          next: (data) => {
            this.storageService.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles || [];
            this.redirectByRole();
          },
          error: (err) => {
            console.error('Erreur Backend:', err);
            this.errorMessage = "Erreur backend: " + (err.error?.message || err.message);
            this.isLoginFailed = true;
          }
        });
      })
      .catch((error) => {
        console.error('Erreur Google:', error);
        this.errorMessage = "Erreur Google: " + error.message;
        this.isLoginFailed = true;
      });
  }

  onForgotPassword(): void {
    const email = this.form.username;

    if (!email) {
      alert("Veuillez saisir votre email pour réinitialiser le mot de passe.");
      return;
    }

    this.authService.forgotPassword(email).subscribe({
      next: () => alert("Un email de réinitialisation a été envoyé."),
      error: (err) => alert("Erreur : " + (err.error?.message || err.message))
    });
  }
}
