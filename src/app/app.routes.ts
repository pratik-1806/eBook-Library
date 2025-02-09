import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-details/book-details.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BooksComponent } from './books/books.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: '',
      component: BooksComponent, // Parent component for the "books" section
      children: [
        { path: 'home', component: BookListComponent },      // /books
        { path: 'add-book', component: BookAddComponent },      // /books/add
        { path: 'book/:id', component: BookDetailComponent }    // /books/:id
      ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
