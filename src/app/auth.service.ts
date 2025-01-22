import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url;
  private jwtToken: string | null = null;

  constructor(private http: HttpClient,
  ) {
    try {
      const storedToken = localStorage.getItem('jwtToken');
      if (storedToken) {
        this.jwtToken = storedToken;
      }
    } catch (e) {
      console.warn('localStorage is not available. Using in-memory token storage.');
    }
  }

  setToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('jwtToken', token);
  }

  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem('jwtToken');
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;

    const body = {
      email,
      password,
    };

    return this.http.post(url, body);
  }

  register(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email,
      password,
    };

    return this.http.post(url, body, { headers });
  }
}
