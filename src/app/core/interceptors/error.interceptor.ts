import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor ejecutado para:', req.url);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';
      console.log('Error capturado:', error);

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};