import { Client } from './../client/client';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Reclamation } from './reclamation';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { ReclamationDTO } from './reclamationDto';


@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor,CommonModule,FormsModule],
  templateUrl: 'reclamation.component.html'
})
export class ReclamationComponent implements OnInit {
  
  reclamations:ReclamationDTO[]=[]
  
  constructor(private data:DataService) {} 
  
  ngOnInit(): void {
    this.OnGetReclamations();
  }

  OnGetReclamations(){
    this.data.getReclams().subscribe({
      next:(rec:any)=>{
        this.reclamations=rec;
      }
    })
  }

deleteReclamation(id:number) {
  this.data.deleteReclam(id).subscribe({
    next:(res)=>{
     this.reclamations=this.reclamations.filter((rec)=>rec.reclamationId!=id);
    }
  })
}

gererReclam(id:number){
this.data.gererReclamation(id).subscribe({
  next:(res)=>{
    this.OnGetReclamations();
  },
  error:(err)=>{
    console.log(err);
  }
})
}
 
}
