import { Component, inject } from '@angular/core';
import { Client } from '../component/client/client';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-log',
  imports:[FormsModule],
  standalone:true,
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  private isLoggedIn = false;
  private userEmail: string | null = null;
  constructor(private data:DataService){}
  router=inject(Router);
  
  onLogin() {
    this.data.login(this.client).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('angularTokenData', res.token);
        this.router.navigateByUrl('/dashboard');
        
      },
      error: (err) => {
        alert('Wrong credentials');
        console.log(err);
      }
    });
  }
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
  };
  
}
