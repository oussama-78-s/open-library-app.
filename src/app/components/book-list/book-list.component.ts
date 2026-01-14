import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../interface/book';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  booksList: Book[] = [];
  bookService = inject(BookServiceService);

  ngOnInit(): void {
    // Charger les livres initiaux
    this.bookService.getBooks().subscribe((data) => {
      this.booksList = data.works;
      this.bookService.updateBooks(data.works);
    });

    // Écouter les mises à jour (recherche)
    this.bookService.books$.subscribe((books) => {
      this.booksList = books;
    });
  }

  getCoverUrl(cover_id: number): string {
    return `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`;
  }

  getBookId(key: string): string {
    return key.replace('/works/', '');
  }
}



