import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form! : FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
     'email' : [null, {
       validators : [Validators.required, Validators.email],
       updateOn: 'blur'
     }],
     'password' : [null, {
       validators : [Validators.required, Validators.minLength(6)]
     }]
    });
   }

  redirectRegister() {
    this.router.navigate(['register'])
  }

  onLogin(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          const token = response.access_token;
          localStorage.setItem('jwtToken', token);
          console.log(token)

          this.authService.setToken(token);

          this.router.navigate(["/destinations"])
        },
        error: (error) => {
          console.error('Error during login:', error);
        },
      });
  }
}
