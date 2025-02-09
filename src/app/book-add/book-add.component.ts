import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
  bookForm: FormGroup;
  selectedFiles: { [key: string]: File } = {};

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  onFileChange(event: any, field: string): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles[field] = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('genre', this.bookForm.get('genre')?.value);
      if (this.selectedFiles['coverImage']) {
        formData.append('coverImage', this.selectedFiles['coverImage']);
      }
      if (this.selectedFiles['file']) {
        formData.append('file', this.selectedFiles['file']);
      }
      this.bookService.createBook(formData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Error creating book:', err)
      });
    }
  }
}
