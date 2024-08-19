import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Client } from '../component/client/client';
import { Reclamation } from '../component/reclamation/reclamation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http :HttpClient) { }
  public host:string='http://localhost:8080';
  router=inject(Router);
  isAuthenticated(): boolean {
    const token = localStorage.getItem('angularTokenData');
    // Check if token exists and is valid
    return !!token;  // Return true if token exists
  }
  getToken(){
    return localStorage.getItem('angularTokenData');
  }
  logout(): void {
    localStorage.removeItem('angularTokenData');
    this.router.navigateByUrl('/log');
  }
  
  getEmail(): string | null {
    const token = localStorage.getItem('angularTokenData');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload.sub);
      return payload.sub || null; // Assuming the email is stored in the 'sub' field
    }
    return null;
  }
  isAdmin(){
    if (this.getEmail()==='admin@gmail.com')
    {
      return true;
    }
    return false;

  }

  //Client
  getClients():Observable<any>{
    return this.http.get(this.host+'/client/get');
  }
  getClient(id:number):Observable<any>{
    return this.http.get(this.host+`/client/get/${id}`);
  }
  postClient(client:any):Observable<any>{
    return this.http.post(this.host+'/client/post',client);
  }
  deleteClient(id:number):Observable<any>{
    return this.http.delete(this.host+`/client/delete/${id}`)
  }
  updateClient(id:number,client:any):Observable<any>{
    return this.http.put(this.host+`/client/put/${id}`,client)
  }
  getReclamationsNumber(id:number){
    return this.http.get(this.host+`/client/reclam/${id}`);
  }
  login(client:Client){
    
    return this.http.post(this.host+'/auth/authenticateClient',client);
  }
  register(client:Client){
    return this.http.post(this.host+'/auth/registerClient',client);
  }
  getClientsNumber():any{
    return this.http.get(this.host+'/client/getNum');
  }

  //Reclamation
  getReclams(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.host+'/reclamation/get');
  }
  getReclam(id:number){
    return this.http.get(this.host+`/reclamation/get/${id}`);
  }
  addReclam(reclam:Reclamation){
    return this.http.post(this.host+'/reclamation/post',reclam);
  }
  deleteReclam(id:number){
    return this.http.delete(this.host+`/reclamation/delete/${id}`);
  }
  updateReclam(id:number,reclam:Reclamation){
    return this.http.put(this.host+`/reclamation/put/${id}`,reclam);
  }
  getClientReclams(){
    return this.http.get(this.host+'/reclamation/client');
  }
  gererReclamation(id:number){
    return this.http.put(this.host+`/reclamation/handle/${id}`,{});
  }
  //Agent
  getAgents():Observable<any>{
    return this.http.get(this.host+'/agent/get');
  }
  getAgent(id:number):Observable<any>{
    return this.http.get(this.host+`/agent/get/${id}`);
  }
  postAgent(client:any):Observable<any>{
    return this.http.post(this.host+'/agent/post',client);
  }
  deleteAgent(id:number):Observable<any>{
    return this.http.delete(this.host+`/agent/delete/${id}`)
  }
  updateAgent(id:number,agent:any):Observable<any>{
    return this.http.put(this.host+`/agent/put/${id}`,agent)
  }
  getAgentsNumber():any{
    return this.http.get(this.host+'/agent/getNum');
  }

  

}
