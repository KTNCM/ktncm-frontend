import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HttpClientTestingModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    // return true
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
