import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'https://elib-apis-production.up.railway.app/api/users/register';
  private loginUrl = 'https://elib-apis-production.up.railway.app/api/users/login';

  constructor(private http:HttpClient) { }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password });
  }
}
