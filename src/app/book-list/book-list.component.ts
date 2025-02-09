import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: any[] = [];
userId: any;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user as string);
    this.userId = userObject._id;
  }

  fetchBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Error fetching books:', err)
    });
  }

  openBook(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }

  addBook(): void {
    this.router.navigate(['/add-book']);
  }
}
