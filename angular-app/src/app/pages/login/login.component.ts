import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login realizado com sucesso:', response);
        
        // Redireciona para a página principal
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        
        // Trata diferentes tipos de erro
        if (error.status === 401) {
          this.errorMessage = 'Credenciais inválidas. Verifique seu usuário e senha.';
        } else if (error.status === 0) {
          this.errorMessage = 'Erro de conexão. Verifique se a API está rodando.';
        } else {
          this.errorMessage = 'Erro no login. Tente novamente.';
        }
        
        console.error('Erro de login:', error);
      }
    });
  }

  clearError() {
    this.errorMessage = '';
  }
}
