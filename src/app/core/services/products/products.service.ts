import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../../../shared/models/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  baseUrl = 'https://ecommerce-0028.onrender.com';
  /*baseUrl = 'http://localhost:3000';*/

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<any>(`${this.baseUrl}/delete-product`, {
      body: { id: productId },
    });
  }

  public getProducts(
    category: string | null,
    subcategory: string | null,
    queryParams?: { sale?: string[]; size?: string[]; price?: number[] }
  ): Observable<Product[]> {
    let url = `${this.baseUrl}/get-products`;

    if (category) {
      url += `/${category}`;
    }

    if (subcategory) {
      url += `/${subcategory}`;
    }

    let params = new HttpParams();

    if (queryParams?.sale) {
      queryParams.sale.forEach((saleValue) => {
        params = params.append('sale', saleValue);
      });
    }

    if (queryParams?.size) {
      queryParams.size.forEach((sizeValue) => {
        params = params.append('size', sizeValue);
      });
    }

    if (queryParams?.price) {
      queryParams.price.forEach((priceValue) => {
        params = params.append('price', priceValue.toString());
      });
    }

    // const fullUrl = url + (params.toString() ? '?' + params.toString() : '');

    return this.http.get<Product[]>(url, { params });
  }

  public editProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit-product`, product);
  }

  public getProductById(id: string): Observable<any> {
    const url = `${this.baseUrl}/get-product-by-id/${id}`;
    return this.http.get<any>(url);
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-product`, product);
  }
}
