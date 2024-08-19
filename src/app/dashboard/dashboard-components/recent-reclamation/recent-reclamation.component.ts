import { Component, OnInit } from '@angular/core';
import {Product,RecentReclam} from './recent-reclamation-data';

@Component({
  selector: 'app-recent-reclam',
  templateUrl: './recent-reclamation.component.html'
})
export class RecentReclamationComponent implements OnInit {

  recent:Product[];

  constructor() { 

    this.recent=RecentReclam;
  }

  ngOnInit(): void {
  }

}
