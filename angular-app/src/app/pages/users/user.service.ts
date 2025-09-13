import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  ativo: boolean;
  role: 'admin' | 'user' | 'manager';
  dataCriacao?: string;
  ultimoLogin?: string;
}

export interface UserResponse {
  success: boolean;
  data: User | User[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private getAuthHeaders() {
    const token = this.cookieService.get('auth_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Buscar todos os usuários
  getAllUsers(): Observable<UserResponse> {
    console.log('👥 Buscando todos os usuários...');
    return this.http.get<UserResponse>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Usuários recebidos:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar usuários:', error);
        return throwError(() => error);
      })
    );
  }

  // Buscar usuário por ID
  getUserById(id: number): Observable<UserResponse> {
    console.log(`👥 Buscando usuário ID: ${id}`);
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Usuário encontrado:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Criar novo usuário
  createUser(user: Omit<User, 'id'>): Observable<UserResponse> {
    console.log('👥 Criando novo usuário:', user);
    return this.http.post<UserResponse>(this.apiUrl, user, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Usuário criado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao criar usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Atualizar usuário
  updateUser(id: number, user: Partial<User>): Observable<UserResponse> {
    console.log(`👥 Atualizando usuário ID: ${id}`, user);
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, user, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Usuário atualizado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao atualizar usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Deletar usuário
  deleteUser(id: number): Observable<UserResponse> {
    console.log(`👥 Deletando usuário ID: ${id}`);
    return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Usuário deletado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao deletar usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Buscar usuários por filtros
  searchUsers(filters: {
    nome?: string;
    email?: string;
    role?: string;
    ativo?: boolean;
    cidade?: string;
    estado?: string;
  }): Observable<UserResponse> {
    console.log('🔍 Buscando usuários com filtros:', filters);
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    return this.http.get<UserResponse>(`${this.apiUrl}/search?${params.toString()}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Usuários filtrados encontrados:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar usuários filtrados:', error);
        return throwError(() => error);
      })
    );
  }

  // Buscar perfil do usuário logado
  getCurrentUserProfile(): Observable<UserResponse> {
    console.log('👤 Buscando perfil do usuário atual...');
    return this.http.get<UserResponse>(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Perfil do usuário:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar perfil:', error);
        return throwError(() => error);
      })
    );
  }
}
