import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6969';
  private jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  constructor(private http: HttpClient,
  ) {
    try {
      // Try to access localStorage
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
