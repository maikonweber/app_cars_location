// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface LoginResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth/login'; // sua API local

  constructor(
    private http: HttpClient,
    
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { username, password };
    
    console.log('Fazendo requisição para:', this.apiUrl);
    
    return this.http.post<LoginResponse>(this.apiUrl, loginData).pipe(
      tap((response) => {
        console.log('📥 Resposta recebida:', response);
        
        // Salva o token no cookie
        this.setToken(response.token);
        
    
        console.log('🍪 Token salvo em cookie');
      }),
      catchError((error) => {
        console.error('💥 Erro no LoginService:', error);
        return throwError(() => error);
      })
    );
  }

  private setToken(token: string): void {
  // Armazena o token no localStorage
    localStorage.setItem('auth_token', token);
  }


 getToken() {
  if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
  }
  return null;
  }

  
  logout(): void {
    // Remove o token do localStorage
    localStorage.removeItem('auth_token');
    console.log('🍪 Token removido do localStorage');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true se o token existir
  }
  
  
}
