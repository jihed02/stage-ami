import { Component, OnInit } from '@angular/core';
import {blogcard,blogcards} from './blog-cards-data';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  standalone:true,
  imports:[NgFor,CommonModule]
})
export class BlogCardComponent implements OnInit {

  blogcards:blogcard[];

  constructor() { 

    this.blogcards=blogcards;
  }

  ngOnInit(): void {
  }

}
