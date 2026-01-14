import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private booksSubject = new BehaviorSubject<any[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get('https://openlibrary.org/subjects/computers.json');
  }

  getBookById(key: string): Observable<any> {
    return this.http.get(`https://openlibrary.org/works/${key}.json`);
  }

  searchByTitle(title: string): Observable<any> {
    return this.http.get(`https://openlibrary.org/search.json?title=${title}`);
  }

  searchByYear(first_publish_year: number): Observable<any> {
    return this.http.get(`https://openlibrary.org/search.json?q=first_publish_year:${first_publish_year}`);
  }

  updateBooks(books: any[]): void {
    this.booksSubject.next(books);
  }
}
