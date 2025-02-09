import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  get userName(): string | null {
    const user= localStorage.getItem('user');
    const userObject = JSON.parse(user as string);
    return userObject.name;
  }

  // Check if a token exists in local storage (indicating that the user is logged in)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout function: removes stored credentials and redirects to login page
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to login or any desired route after logout
    window.location.href = '/login';
  }

 

}
