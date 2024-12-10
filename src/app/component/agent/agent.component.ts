import { Client } from './../client/client';
import { NgFor } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Agent } from './Agent';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: 'agent.component.html',
  styleUrls: ["./agent.scss"]
})
export class AgentComponent implements OnInit {

  agents: Agent[] = [];
 
  agent: Agent = { nom: '', prenom: '', email: '', absence: 0, matricule: 0, password: '' };
  isEditMode = false;


  constructor(private data: DataService) {}

  ngOnInit(): void {
   this.OnGetAgents();
  }
  OnGetAgents() {
    this.data.getAgents().subscribe({
      next: (res) => {
        this.agents = res;
        this.filtredAgents=[...this.agents];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  openAddAgentModal() {
    this.resetForm();
    this.isEditMode = false;
    this.showModal();
  }

  openEditAgentModal(agent: Agent) {
    this.agent = { ...agent };
    this.isEditMode = true;
    this.showModal();
  }

  showModal() {
    const modalElement = document.getElementById('addAgentModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addAgentModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }

  isFormValid(): boolean {
    return Boolean(this.agent.nom && this.agent.prenom && this.agent.email && this.agent.matricule  && this.agent.password);
  }

  resetForm() {
    this.agent = { nom: '', prenom: '', email: '', absence: 0, matricule: 0, password: '' };
  }

  onSubmit() {
    if (this.isFormValid()) {
      if (this.isEditMode) {
        this.data.updateAgent(this.agent.matricule,this.agent).subscribe({
          next: (res) => {
            const index = this.agents.findIndex(agent => agent.matricule === this.agent.matricule);
            if (index !== -1) {
              this.agents[index] = this.agent;
            }
            this.resetForm();
            this.closeModal();
            this.OnGetAgents();
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.data.postAgent(this.agent).subscribe({
          next: (res) => {
            console.log('Agent added successfully', res);
            this.agents.push(res);
            this.resetForm();
            this.closeModal();
            this.OnGetAgents();
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

  
  deleteAgent(mat: number) {
    this.data.deleteAgent(mat).subscribe({
      next: (res) => {
        console.log('Agent deleted successfully', res);
        this.agents = this.agents.filter(agent => agent.matricule !== mat);
        this.OnGetAgents();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  searchMat: string='';
  filtredAgents:Agent[]=[];
  onSearch() {
    if(this.searchMat.trim()===''){
      this.filtredAgents=[...this.agents];
    }
    else{
      this.filtredAgents=this.agents.filter(agent=>agent.matricule.toString().startsWith(this.searchMat));
    }
    }
    
}
