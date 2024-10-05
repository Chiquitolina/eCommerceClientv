import { Injectable } from '@angular/core';
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

  private authUrl = 'http://localhost:3000/admin/login'

  constructor(private http: HttpClient) { }

  public authenticate(credentials: {adminUser: string, adminPassword: string}) : Observable<AuthResponse> {
    return this.http.post<any>(this.authUrl, credentials)
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
