import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { authGuard } from './core/guards/auth.guard';
import { reverseAuthGuard } from './core/guards/reverse-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [reverseAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [reverseAuthGuard]},
  { path: 'destinations', component: DestinationsComponent, canActivate: [authGuard] }
];
