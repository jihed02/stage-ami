import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reclamation } from 'src/app/component/reclamation/reclamation';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reclam',
  templateUrl: './reclam.component.html',
  styleUrls: ['./reclam.component.scss'],
})
export class ReclamComponent implements OnInit {

  
mesReclams: Reclamation[] = [];

  constructor(private data:DataService){}
  
  ngOnInit(): void {
    this.onGetReclams();
  }
  onGetReclams(){
    this.data.getClientReclams().subscribe({
      next:(res:any)=>{
        console.log('res'+res);
        this.mesReclams=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  logout(): void {
    this.data.logout()
   }

}
