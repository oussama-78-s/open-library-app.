import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeadBarComponent, SearchBarComponent, BookListComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'open-library-app';
}

