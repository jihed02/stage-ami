import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm,  } from '@angular/forms';
import { Client } from './client';
import { DataService } from 'src/app/services/data.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor,FormsModule,CommonModule,],
  templateUrl: 'client.component.html',

  
})
export class ClientComponent implements OnInit {
  constructor(private data:DataService) {

  }
  loadData(){
    this.onGetClients();
    this.filteredClients=[...this.clients];
  }
  onGetClients(){
    this.data.getClients().subscribe({
      next:(res)=>{
        this.client=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.data.getClients().subscribe((cl)=>{
     this.clients=cl; 
     console.log(cl);
     this.filteredClients = [...this.clients];    
    })
   }
   client :Client={
    nom: '',
    prenom: '',
    adresse: '',
    cin: 0,
    age: 0,
    telephone: '',
    email: '',
    password: '',
    status: '',
    reclamations: []
  }
  clients : Client[]=[];
  
  isEditMode = false;
  
  openAddClient() {
    this.resetForm();
    this.isEditMode=false;
    this.showModal();
}
  openEditClient(client:Client){
    this.client={...client}
    this.isEditMode=true;
    this.showModal();
  }
  deleteClient(cin:number){
    this.data.deleteClient(cin).subscribe({
      next:(res)=>{
        console.log('Agent deleted successfully', res);
        this.clients = this.clients.filter(cl => cin!== cl.cin);
        this.loadData();
     
      }
    })
  }
 showModal() {
 const modalElement=document.getElementById('addClientModal');
 if(modalElement){
   const modal=new bootstrap.Modal(modalElement);
   modal.show();}
}
closeModal(){
  const modalElemnt=document.getElementById('addClientModal');
  if(modalElemnt){
    const modal= bootstrap.Modal.getInstance(modalElemnt);
    if(modal){
      modal.hide();
    }
  }
}
resetForm(){
  this.client={  nom: '',
    prenom: '',
    adresse: '',
    cin: 0,
    age: 0,
    telephone: '',
    email: '',
    password: '',
    status: '',
    reclamations: []}
}
isFormValid() {
  return Boolean(
    this.client.nom &&
    this.client.prenom &&
    this.client.age &&
    this.client.cin &&
    this.client.email &&
    this.client.password &&
    this.client.telephone
  );
}

onSubmit() {
  if (this.isFormValid()) {
    if (this.isEditMode) {
      this.data.updateClient(this.client.cin, this.client).subscribe({
        next: (res) => {
          const index = this.clients.findIndex(cl => this.client.cin === cl.cin);
          if (index !== -1) {
            this.clients[index] = this.client;
          }
          this.resetForm();
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.data.postClient(this.client).subscribe({
        next: (res) => {
          alert('Client added successfully');
          this.clients.push(res);
          this.resetForm();
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  } else {
    alert('Form invalid');
  }
}
  searchCIN: string = '';
  filteredClients :Client[]=[];
  onSearch() {
    if (this.searchCIN.trim() === '') {
      this.filteredClients = [...this.clients];
    } else {
      const searchCINNum = parseInt(this.searchCIN, 10);
      this.filteredClients = this.clients.filter(client => client.cin.toString().includes(searchCINNum.toString()));
    }
  }
  hasPendingReclamation(client: Client): boolean {
    return client.reclamations.some(reclamation => reclamation.status ===false);
  }
 
  getBadgeClass(client: Client): string {
    return this.hasPendingReclamation(client) ? 'bg-warning' : 'bg-success';
  }

  getBadgeText(client: Client): string {
    return this.hasPendingReclamation(client) ? 'en attente' : 'Pas de reclamations';
  }
  
}