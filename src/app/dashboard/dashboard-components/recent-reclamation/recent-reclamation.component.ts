import { Component, OnInit } from '@angular/core';
import {Product,RecentReclam} from './recent-reclamation-data';
import { DataService } from 'src/app/services/data.service';
import { Reclamation } from 'src/app/component/reclamation/reclamation';
import { ReclamationDTO } from 'src/app/component/reclamation/reclamationDto';

@Component({
  selector: 'app-recent-reclam',
  templateUrl: './recent-reclamation.component.html'
})
export class RecentReclamationComponent implements OnInit {

  reclamations:ReclamationDTO[]=[];

  constructor(private data:DataService) {}

  ngOnInit(): void {
    this.onGetReclamations();
  }
  onGetReclamations(){
    this.data.getReclams().subscribe({
      next:(res:any)=>{
        this.reclamations=res.slice(-5);
        console.log(this.reclamations)
      },
      error:(err)=>{
        console.log(err);
      }

    }) }

}
