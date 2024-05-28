import {
    HttpHeaders,
    HttpInterceptorFn,
    HttpRequest,
  } from '@angular/common/http';
  
  export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next
  ) => {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  
    const reqClone = req.clone({
      headers,
    });
  
    return next(reqClone);
  };