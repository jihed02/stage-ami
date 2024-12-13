import { Component, OnInit } from '@angular/core';
import { Feed } from './feeds-data';
import { DataService } from 'src/app/services/data.service';
import { Reclamation } from 'src/app/component/reclamation/reclamation';
import { Client } from 'src/app/component/client/client';
import { Agent } from 'src/app/component/agent/Agent';
import { ReclamationDTO } from 'src/app/component/reclamation/reclamationDto';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {

  reclamations:Reclamation[]=[];
  pendingReclams:number=0;
  feeds: Feed[]=[];
  clients:Client[]=[];
  agents:Agent[]=[];
  reclamationsDTO:ReclamationDTO[]=[]


  constructor(private data:DataService) {
   
  }
  ngOnInit(): void {
    this.OnGetReclamations();
    this.onGetClients();
    this.onGetAgents();
    }
 
  OnGetReclamations(){
    this.data.getReclams().subscribe({
      next:(rec:any)=>{
        console.log(rec);
        this.reclamations=rec;
        this.reclamationsDTO=rec;
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
  onGetAgents(){
    this.data.getAgents().subscribe({
      next:(res)=>{
        console.log(res);
          this.agents=res;
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
        task: `You have ${this.pendingReclams} pending reclamations`,
        
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Server 1 overloaded.',
        
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-chat-left-text',
        task: this.reclamationsDTO.length>1? `New reclamation received from : ${this.reclamationsDTO[this.reclamationsDTO.length-1].clientNom} `+`${this.reclamationsDTO[this.reclamationsDTO.length-1].clientPrenom}`:'',
       
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: this.clients.length>0? `New client added : ${this.clients[this.clients.length-1].nom } `+`${this.clients[this.clients.length-1].prenom}`:'',
        
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-person',
        task: this.agents.length>0?`New agent added : ${this.agents[this.agents.length-1].nom } `+`${this.agents[this.agents.length-1].prenom}`:' no agent added yet' ,
    },

] 
  }
}
