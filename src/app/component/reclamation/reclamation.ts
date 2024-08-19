import { Client } from "../client/client"


export interface Reclamation{
    id:number;
    status:boolean,
    categorie:string,
    detail:string,
    client:Client
    date: string | Date; 
}