// src/app/services/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user?: any;
  expires_in?: number;
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
    private cookieService: CookieService
  ) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { username, password };
    
    return this.http.post<LoginResponse>(this.apiUrl, loginData).pipe(
      tap((response) => {
        // Salva o token no cookie
        this.setToken(response.access_token);
        
        // Salva refresh token se existir
        if (response.refresh_token) {
          this.setRefreshToken(response.refresh_token);
        }
        
        // Salva dados do usuário se existirem
        if (response.user) {
          this.setUserData(response.user);
        }
      }),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      })
    );
  }

  private setToken(token: string): void {
    // Cookie expira em 7 dias (ou ajuste conforme necessário)
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    
    this.cookieService.set('auth_token', token, {
      expires,
      secure: false, // true em produção com HTTPS
      sameSite: 'Strict'
    });
  }

  private setRefreshToken(refreshToken: string): void {
    // Refresh token expira em 30 dias
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    
    this.cookieService.set('refresh_token', refreshToken, {
      expires,
      secure: false, // true em produção com HTTPS
      sameSite: 'Strict'
    });
  }

  private setUserData(user: any): void {
    this.cookieService.set('user_data', JSON.stringify(user), {
      expires: 7, // 7 dias
      secure: false,
      sameSite: 'Strict'
    });
  }

  getToken(): string | null {
    return this.cookieService.get('auth_token') || null;
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refresh_token') || null;
  }

  getUserData(): any {
    const userData = this.cookieService.get('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('refresh_token');
    this.cookieService.delete('user_data');
  }
}
