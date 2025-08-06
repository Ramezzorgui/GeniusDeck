import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NonAdminGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const user = this.storageService.getUser();

    // Si c'est un admin → redirection vers dashboard
    if (user && user.roles && user.roles.includes('ADMIN')) {
      this.router.navigate(['/dashboard1']); 
      return false;
    }

    // Autorisé si ce n’est pas admin
    return true;
  }
}
