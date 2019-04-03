import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService) {

  }

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

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    // const ratedBook = { ...book, rating: book.rating + 1}
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  updateList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }
}
