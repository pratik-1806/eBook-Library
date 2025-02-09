import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailComponent implements OnInit {
  book: any;
  bookId!: string;
  showEditForm: boolean = false;
  updateForm!: FormGroup;
  author: any;
  isOwner: any;
  // Hold selected files (for coverImage and file)
  updateFiles: { [key: string]: File } = {};

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.fetchBook();
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  fetchBook(): void {
    this.bookService.getSingleBook(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.author = data['author'];
        const user = localStorage.getItem('user');
        const userObject = JSON.parse(user as string);
        this.isOwner = this.author._id == userObject._id;
        // Pre-fill update form with current book values
        this.updateForm.patchValue({
          title: data.title,
          genre: data.genre,
        });
      },
      error: (err) => console.error('Error fetching book:', err),
    });
  }

  toggleEdit(): void {
    this.showEditForm = !this.showEditForm;
  }

  onFileChange(event: any, field: string): void {
    if (event.target.files && event.target.files.length > 0) {
      this.updateFiles[field] = event.target.files[0];
    }
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('title', this.updateForm.get('title')?.value);
      formData.append('genre', this.updateForm.get('genre')?.value);
      if (this.updateFiles['coverImage']) {
        formData.append('coverImage', this.updateFiles['coverImage']);
      }
      if (this.updateFiles['file']) {
        formData.append('file', this.updateFiles['file']);
      }
      this.bookService.updateBook(this.bookId, formData).subscribe({
        next: () => {
          // Refresh the book details and hide the update form
          this.fetchBook();
          this.showEditForm = false;
        },
        error: (err) => console.error('Error updating book:', err),
      });
    }
  }

  confirmDelete(): void {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.bookId).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error('Error deleting book:', err),
      });
    }
  }
}
