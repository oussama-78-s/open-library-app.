import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { BookServiceService } from '../../services/book-service.service';

@Component({
  selector: 'app-search-bar',
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private bookService: BookServiceService) { }

  searchByTitle(title: string): void {
    if (title.trim()) {
      this.bookService.searchByTitle(title).subscribe(result => {
        // Transformer les résultats pour correspondre au format attendu
        const books = result.docs.map((doc: any) => ({
          key: doc.key,
          title: doc.title,
          cover_id: doc.cover_i,
          first_publish_year: doc.first_publish_year
        }));
        this.bookService.updateBooks(books);
      });
    }
  }

  searchByYear(year: string): void {
    const yearNumber = parseInt(year, 10);
    if (!isNaN(yearNumber)) {
      this.bookService.searchByYear(yearNumber).subscribe(result => {
        // Transformer les résultats pour correspondre au format attendu
        const books = result.docs.map((doc: any) => ({
          key: doc.key,
          title: doc.title,
          cover_id: doc.cover_i,
          first_publish_year: doc.first_publish_year
        }));
        this.bookService.updateBooks(books);
      });
    }
  }

  resetSearch(): void {
    this.bookService.getBooks().subscribe(data => {
      this.bookService.updateBooks(data.works);
    });
  }
}
