import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
        console.error(err);
      }
    });
  }

  blockUser(id: number): void {
  if (confirm('Voulez-vous vraiment bloquer cet utilisateur ?')) {
    this.userService.blockUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Erreur lors du blocage', err)
    });
  }
}

unblockUser(id: number): void {
  if (confirm('Voulez-vous vraiment débloquer cet utilisateur ?')) {
    this.userService.unblockUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Erreur lors du déblocage', err)
    });
  }
}


  
}
