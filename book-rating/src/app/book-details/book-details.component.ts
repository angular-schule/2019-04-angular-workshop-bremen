import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('isbn')),
        switchMap(isbn => this.bs.getSingle(isbn)
          .pipe(
            catchError((err: HttpErrorResponse) => of({
              isbn: '0',
              title: 'Error loading ' + err.url,
              description: 'There was an error loading the resource.',
              rating: 1
            }))
          )
        )
      )
      .subscribe(book  => this.book = book);
  }

}
