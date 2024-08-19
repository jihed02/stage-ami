import { Client } from './../component/client/client';
import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private data:DataService){};
  router=inject(Router);
  client:Client={
    nom: '',
    prenom: '',
    adresse: '',
    cin:0,
    email: '',
    password: '',
    status: '',
    age: 0,
    telephone: '',
    reclamations: []
  }
  onRegister(){
    this.data.register(this.client).subscribe({
      next:(res:any)=>{
        this.router.navigateByUrl('log');
        
      },
      error:(err:any)=>{console.log(err)
    }
  
  })
}

}
