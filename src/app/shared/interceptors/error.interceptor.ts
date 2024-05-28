import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '@services/toast.service';
import { LoginService } from '@services/login.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(LoginService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && !window.location.href.includes('auth')) {
        authService.logOut();
      }

      try {
        const messageObject = JSON.parse(error.error.message);
        if (messageObject && messageObject.message) {
          error.error.message = messageObject.message;
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}

      let msg = '';
      if (Array.isArray(error.error.message)) {
        msg = error.error.message[0].message;
      } else {
        msg = error.error.message || 'An unknown error occurred!';
      }

      toastService.dispatchToast({
        message: msg,
        title: error.status.toString(),
        icon: 'close',
      });
      throw error;
    })
  );
};