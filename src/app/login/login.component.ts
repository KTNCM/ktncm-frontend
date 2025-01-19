import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    // Set JWT token before making a request
    this.authService.setToken('your-jwt-token-here');

    // Call login API
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('jwtToken', response.token); // Save token
        this.authService.setToken(response.token); // Update token in service
      },
      error: (error) => {
        console.error('Error during login:', error);
      },
    });
  }
}
