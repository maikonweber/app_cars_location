import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    // Verifica se o usuário está autenticado
    if (this.loginService.isAuthenticated()) {
      return true;
    }

    // Se não estiver autenticado, redireciona para login
    console.log('Usuário não autenticado. Redirecionando para login...');
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    
    return false;
  }
}
