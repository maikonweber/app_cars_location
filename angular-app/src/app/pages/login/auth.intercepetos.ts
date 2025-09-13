// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Obtém o token do cookie
    const token = this.loginService.getToken();
    
    let authReq = req;
    
    // Se existe token, adiciona no header Authorization
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        
        // Se o erro for 401 (Unauthorized), redireciona para login
        if (error.status === 401) {
          console.log('Token expirado ou inválido. Redirecionando para login...');
          
          // Remove tokens inválidos
          this.loginService.logout();
          
          // Redireciona para login
          this.router.navigate(['/login']);
        }
        
        // Se o erro for 403 (Forbidden)
        if (error.status === 403) {
          console.log('Acesso negado. Usuário sem permissão.');
        }
        
        return throwError(() => error);
      })
    );
  }
}
