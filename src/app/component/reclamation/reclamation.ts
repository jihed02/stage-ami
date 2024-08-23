import { Detail } from "src/app/clientt/home/detail";
import { Client } from "../client/client"


export interface Reclamation{
    id:number;
    status:boolean,
    categorie:string,
    detail:Detail,
    client:Client
    date: string | Date; 
}