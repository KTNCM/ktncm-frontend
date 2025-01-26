import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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

  redirectLogin() {
    this.router.navigate(['login'])
  }


  onRegister(): void {
    const email = this.form.value.email;
    const password = this.form.value.password;

      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Register successful:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during login:', error);
        },
      });
  }
}
