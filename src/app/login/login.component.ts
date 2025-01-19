import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form! : FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {  }

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
      //  asyncValidators : [this.form.bind(this)],
       updateOn: 'blur'
     }],
     'password' : [null, {
       validators : [Validators.required, Validators.minLength(6)]
     }]
    });
   }

  onLogin(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;


      // Call the login API via AuthService
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          // Store the token in local storage
          localStorage.setItem('jwtToken', response.token);

          // Set the token in AuthService
          this.authService.setToken(response.token);

          // Optionally, navigate to another route or notify the user
        },
        error: (error) => {
          console.error('Error during login:', error);

          // You can add a UI element to show the error message to the user
        },
      });
  }
}
