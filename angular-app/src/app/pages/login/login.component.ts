import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


 
  onSubmit() {
    this.http.post<any>('http://localhost:3000/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        // Salva o token no localStorage
        localStorage.setItem('token', response.access_token);

        // Redireciona para home
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Login falhou. Verifique suas credenciais.');
        console.error('Erro de login:', error);
      }
    });
  }

}
