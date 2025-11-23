import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private authUrl = 'https://store.impact96.com.ar/admin/login'

  private _http = inject(HttpClient)

  public authenticate(credentials: {adminUser: string, adminPassword: string}) : Observable<AuthResponse> {
    return this._http.post<any>(this.authUrl, credentials)
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate > new Date();
    }
    return false;
  }

}
