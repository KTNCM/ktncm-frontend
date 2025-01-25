import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.url;
  private readonly TOKEN_KEY = 'jwtToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const body = { email, password };

    return this.http.post(url, body);
  }

  register(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { email, password };

    return this.http.post(url, body, { headers });
  }

  setToken(token: string): void {
    this.storageService.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
