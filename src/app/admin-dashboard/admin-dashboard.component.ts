import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { UserService } from 'src/app/_services/user.service';
import { PresentationService } from 'src/app/_services/presentation.service'
import { CommentService } from 'src/app/_services/comment.service'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;               
  activeUsers = 750;
  presentationsGenerated = 0;
  allComments: CommentService[] = [];

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Admin', 'User', 'Anonym'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#007bff', '#28a745', '#ffc107']
      }
    ]
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Présentations générées',
        data: [5, 10, 15, 20, 18, 25, 30],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.2)',
        fill: true
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };

  constructor(private userService: UserService,
    private presentationService: PresentationService,
  private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadTotalUsers();
    this.loadPresentationsGenerated();
    this.loadUserRolesCount();
    this.loadActiveUsersMonthly();


  }

  loadTotalUsers() {
    this.userService.getUsersCount().subscribe({
      next: (res) => {
        this.totalUsers = res.count;
      },
      error: (err) => {
        console.error('Erreur récupération total users:', err);
      }
    });
  }
  loadPresentationsGenerated() {
    this.presentationService.getPresentationsCount().subscribe({
      next: (res) => {
        this.presentationsGenerated = res.count;
      },
      error: (err) => {
        console.error('Erreur récupération presentations générées:', err);
      }
    });
  }

  loadUserRolesCount() {
  this.userService.getUserRolesCount().subscribe({
    next: (rolesCount) => {
      console.log('Roles count reçus :', rolesCount);

      this.pieChartData = {
        ...this.pieChartData,
        datasets: [{
          ...this.pieChartData.datasets[0],
          data: [
            rolesCount['ADMIN'] || 0,
            rolesCount['USER'] || 0,
            rolesCount['ANONYM'] || 0
          ]
        }]
      };
    },
    error: (err) => {
      console.error('Erreur récupération rôles utilisateurs:', err);
    }
  });
}
public activeUsersChartData: ChartConfiguration<'line'>['data'] = {
  labels: [], 
  datasets: [
    {
      label: 'Utilisateurs actifs',
      data: [],  
      borderColor: '#28a745',
      backgroundColor: 'rgba(40,167,69,0.2)',
      fill: true
    }
  ]
};

public activeUsersChartOptions: ChartConfiguration<'line'>['options'] = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

loadActiveUsersMonthly() {
  this.userService.getActiveUsersMonthly().subscribe({
    next: (res) => {
      this.activeUsersChartData = {
        labels: res.labels,
        datasets: [
          {
            label: 'Utilisateurs actifs',
            data: res.data,
            borderColor: '#28a745',
            backgroundColor: 'rgba(40,167,69,0.2)',
            fill: true
          }
        ]
      };
    },
    error: (err) => {
      console.error('Erreur récupération active users monthly:', err);
    }
  });}

  topTemplates = [
  { name: 'Business Clean', usageCount: 120 },
  { name: 'Dark Tech', usageCount: 97 },
  { name: 'Modern Corporate', usageCount: 84 },
  { name: 'Simple Slides', usageCount: 78 },
  { name: 'Creative Pitch', usageCount: 67 }
];

recentFeedback = [
  { username: 'Alice', message: 'Super outil ! Très pratique.' },
  { username: 'Bob', message: 'Interface fluide et intuitive.' },
  { username: 'Claire', message: 'Les modèles sont très pros.' }
];

}
