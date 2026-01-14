import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookServiceService } from '../../services/book-service.service';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book: any = null;
  bookId: string = '';
  publishYear: string = '';
  coverId: string = '';
  bookService = inject(BookServiceService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    this.publishYear = this.route.snapshot.queryParamMap.get('year') || '';
    this.coverId = this.route.snapshot.queryParamMap.get('cover') || '';

    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe(data => {
        this.book = data;
        console.log('Book data:', data);
      });
    }
  }

  getDescription(): string {
    if (!this.book?.description) return '';
    if (typeof this.book.description === 'string') {
      return this.book.description;
    }
    if (typeof this.book.description === 'object' && this.book.description.value) {
      return this.book.description.value;
    }
    return '';
  }

  getCoverUrl(): string {
    if (this.book?.covers && this.book.covers.length > 0) {
      return `https://covers.openlibrary.org/b/id/${this.book.covers[0]}-L.jpg`;
    }
    return 'https://via.placeholder.com/300x450?text=No+Cover';
  }
}

