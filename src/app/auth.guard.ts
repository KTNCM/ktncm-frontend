import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('jwtToken');
  const router = inject(Router);
  if (token) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
