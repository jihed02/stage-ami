import { Component, OnInit } from '@angular/core';
import { Feed } from './feeds-data';
import { DataService } from 'src/app/services/data.service';
import { Reclamation } from 'src/app/component/reclamation/reclamation';
import { Client } from 'src/app/component/client/client';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {

  reclamations:Reclamation[]=[];
  pendingReclams:number=0;
  feeds: Feed[]=[];
  clients:Client[]=[];


  constructor(private data:DataService) {
   
  }
  ngOnInit(): void {
    this.OnGetReclamations();
    this.onGetClients();
    }
 
  OnGetReclamations(){
    this.data.getReclams().subscribe({
      next:(rec:any)=>{
        console.log(rec);
        this.reclamations=rec;
        this.getPendingReclamationsCount();
      }
    })
  }
  onGetClients(){
    this.data.getClients().subscribe({
      next:(res)=>{
        console.log(res);
          this.clients=res;
          this.updateFeeds();

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getPendingReclamationsCount(): void {
    this.pendingReclams= this.reclamations.filter(reclamation => reclamation.status === false).length;
    this.updateFeeds();
  }

  updateFeeds(){
  this.feeds= [
    {
        class: 'bg-info',
        icon: 'bi bi-bell',
        task: `you have ${this.pendingReclams} pending reclamations`,
        time: 'Just Now'
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Server #1 overloaded.',
        time: '2 Hours ago'
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-bag-check',
        task: 'New order received.',
        time: '31 May'
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: this.clients.length>0? `new client registred : ${this.clients[this.clients.length-1].nom } `+`${this.clients[this.clients.length-1].prenom}`:'',
        time: '30 May'
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-person',
        task: 'You have new password.',
        time: '21 May'
    },

] 
  }
}
