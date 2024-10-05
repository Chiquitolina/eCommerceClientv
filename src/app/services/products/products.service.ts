import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, pipe, throwError, tap } from 'rxjs';
import { Product } from '../../models/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  baseUrl = 'http://localhost:3000';

  public deleteProduct(productId: number): Observable<void> {
    return this.http
      .delete<any>(`${this.baseUrl}/delete-product`, {
        body: { id: productId },
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting product:', error);
          return throwError(() => error);
        })
      );
  }   

  public getProducts(category: string | null, subcategory: string | null): Observable<Product[]> {
    let url = `${this.baseUrl}/get-products`;
  
    if (category) {
      url += `/${category}`;
    }
  
    if (subcategory) {
      url += `/${subcategory}`;
    }
  
    return this.http.get<Product[]>(url).pipe(
      tap((products) => console.log(products)),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => error);
      })
    );
  }

  public editProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit-product`, product).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => error);
      })
    );
  }

  public getProductById(id: string): Observable<any> {
    const url = `${this.baseUrl}/get-product-by-id/${id}`;
    return this.http.get<any>(url);
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-product`, product);
  }

  public addAnalytic(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-analytic`, product).pipe(
      tap((response: Response) => console.log('Añalítica añadida', response)),
      catchError((error) => {
        console.error('Error añadiendo analítica:', error);
        return throwError(() => error);
      })
    );
  }
}
