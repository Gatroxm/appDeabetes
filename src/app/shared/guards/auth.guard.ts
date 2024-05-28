import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(LoginService);
  const router = inject(Router)
  const user = isAuthenticated.isAuthenticated();
  if (user) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }
};
