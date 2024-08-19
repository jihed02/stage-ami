import { Component, OnInit } from '@angular/core';
import { topcard } from './top-cards-data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: topcard[] = [];
  agentsNumber: number = 0;
  clientsNumber: number = 0;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.fetchDataAndUpdateCards();
  }

  fetchDataAndUpdateCards(): void {
    this.data.getClientsNumber().subscribe({
      next: (res: number) => {
        this.clientsNumber = res;
        this.updateTopCards(); // Update after clients number is fetched
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    // Fetch agents number
    this.data.getAgentsNumber().subscribe({
      next: (res: number) => {
        this.agentsNumber = res;
        this.updateTopCards(); // Update after agents number is fetched
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    // Fetch clients number
    
  }

  updateTopCards(): void {
    this.topcards = [
      {
        bgcolor: 'danger',
        icon: 'bi bi-chat-left-text',
        title: 'Reclamations',
        subtitle: '5'
      },
      {
        bgcolor: 'danger',
        icon: 'bi bi-exclamation-triangle',
        title: 'Alertes',
        subtitle: '2'
      },
      {
        bgcolor: 'warning',
        icon: 'bi bi-person-circle fs-3',
        title: 'Clients Number',
        subtitle: `${this.clientsNumber}` // Update this based on fetched clients number if needed
      },
      {
        bgcolor: 'info',
        icon: 'bi bi-person-circle fs-3',
        title: 'Agents Number',
        subtitle: `${this.agentsNumber}`
      },
    ];
  }
}
