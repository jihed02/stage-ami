import { Reclamation } from './../reclamation/reclamation';
export interface Client {
            
    nom: string;
    prenom:string;
    adresse:string;  
    cin:number;  
    age:number;
    telephone:string;     
    email: string;
    password:string; 
    status:string;
    reclamations:Reclamation[]; 
       
  }