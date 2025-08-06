import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { CommentService, Comment } from '../_services/comment.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 comments: any[] = [];

  newComment: Comment = { username: '', content: '' };
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commentService: CommentService
  ) { }

    ngOnInit(): void {
       this.isLoggedIn = this.storageService.isLoggedIn();
    this.getLatestComments();
  }

  getLatestComments(): void {
    this.commentService.getLatest().subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commentaires récents', err);
      }
    });
  }

  startCreation(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToStart(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/create-presentation']);
    } else {
      this.router.navigate(['/login']);
    }
  }
   selectTemplate(templateId: string): void {
    console.log('Template sélectionné :', templateId);
  }

  loadComments(): void {
    this.commentService.getComments().subscribe(data => {
      this.comments = data;
    });
  }

  submitComment(): void {
    if (this.newComment.username && this.newComment.content) {
      this.commentService.addComment(this.newComment).subscribe(() => {
        this.newComment = { username: '', content: '' };
        this.loadComments();
      });
    }
  }
}
