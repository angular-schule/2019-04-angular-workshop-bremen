import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor() { }

  ngOnInit() {
    this.books = [{
      isbn: '111',
      title: 'Angular',
      description: 'tolles Buch',
      rating: 5,
    }, {
      isbn: '222',
      title: 'AngularJS',
      description: 'auch ein tolles Buch',
      rating: 2
    }, {
      isbn: '333',
      title: 'React',
      description: 'für Leute die kein NG mögen',
      rating: 1
    }];
  }
}
