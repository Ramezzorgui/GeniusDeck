import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const user = this.storageService.getUser();

    if (user && user.roles && user.roles.includes('ADMIN')) {
      return true;
    }

    // Rediriger si pas admin
    this.router.navigate(['/home']);
    return false;
  }
}
