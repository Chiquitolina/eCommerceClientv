import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private _http = inject(HttpClient)

  public createOrder(params: any): Observable<any> {
    console.log(params)
    return this._http.post('https://ecommerce-0028.onrender.com/create-order', params);
  }
}
