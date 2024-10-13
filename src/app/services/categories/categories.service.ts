import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, pipe, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = 'http://localhost:3000';

  http = inject(HttpClient);

  getCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/get-categories`).pipe(
      tap((data: any) => {}),
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => error);
      })
    );
  }
}
