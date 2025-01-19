import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url;
  private jwtToken = environment.jwt;

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
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`; // Full API endpoint
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`, // Attach JWT token
    });

    const body = {
      email,
      password,
    };

    return this.http.post(url, body, { headers });
  }
}
