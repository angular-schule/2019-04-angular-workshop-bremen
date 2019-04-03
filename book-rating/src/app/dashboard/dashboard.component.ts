import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private rs: BookRatingService, private bs: BookStoreService) {

  }

  ngOnInit() {
    this.bs.getAll().subscribe((books) => {
      this.books = books;
    });
  }

  addBook(book: Book) {
    this.books = [...this.books, book];
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
