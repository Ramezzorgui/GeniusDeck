import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedPresentations = localStorage.getItem('savedPresentations');
    if (savedPresentations) {
      this.history = JSON.parse(savedPresentations);
    }
  }

  loadPresentation(id: number) {
    // Naviguer vers l'éditeur avec l'ID en paramètre
    this.router.navigate(['/edit-presentation'], { queryParams: { id } });
  }
}
