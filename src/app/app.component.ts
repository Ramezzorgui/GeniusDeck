import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  currentUser: any; 
  title = 'angular-16-jwt-auth';

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    public router: Router
  ) {}

  hideSidebar(): boolean {
    const noSidebarRoutes = ['/', '/home', '/dashboard'];
    return noSidebarRoutes.includes(this.router.url);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.currentUser = this.storageService.getUser(); // ✅ affecté ici
      console.log('Utilisateur connecté depuis storage :', this.currentUser);

      this.roles = this.currentUser.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_USER');

      this.username = this.currentUser.name || this.currentUser.username || this.currentUser.email;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.error('Erreur lors du logout :', err);
        this.storageService.clean();
        window.location.reload();
      }
    });
  }

  getProfileRoute(): string {
    if (this.currentUser?.roles?.includes('ADMIN')) {
      return '/profile';
    } else if (this.currentUser?.roles?.includes('USER')) {
      return '/profile-user';
    }
    return '/'; 
  }
  isHomePage(): boolean {
  return this.router.url === '/' || this.router.url === '/home';
}
}
