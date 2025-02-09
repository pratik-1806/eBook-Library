// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Adjust the base URL to match your backend endpoints.
  private baseUrl = 'https://elib-apis-production.up.railway.app/api/books/';

  constructor(private http: HttpClient) {}

  // Helper: get the Authorization header (assumes token is stored in localStorage)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // 1. Create a new book (expects FormData with title, genre, coverImage, file)
  createBook(bookData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.baseUrl+"createbook", bookData, { headers });
  }

  // 2. Update an existing book by id (accepts FormData; any field can be updated)
  updateBook(bookId: string, bookData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl+"updatebook"}/${bookId}`;
    return this.http.patch<any>(url, bookData, { headers });
  }

  // 3. Get all books (each book contains title, genre, coverImage, file, author id, and author name)
  getAllBooks(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.baseUrl+"allbooks", { headers });
  }

  // 4. Get a single book by id
  getSingleBook(bookId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/${bookId}`;
    return this.http.get<any>(url, { headers });
  }

  // 5. Delete a book by id
  deleteBook(bookId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/${bookId}`;
    return this.http.delete<any>(url, { headers });
  }
}
