import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface Car {
  id?: number;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  preco: number;
  placa: string;
  disponivel: boolean;
  imagem?: string;
  descricao?: string;
}

export interface CarResponse {
  success: boolean;
  data: Car | Car[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/cars';

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

  // Buscar todos os carros
  getAllCars(): Observable<CarResponse> {
    console.log('🚗 Buscando todos os carros...');
    return this.http.get<CarResponse>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Carros recebidos:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar carros:', error);
        return throwError(() => error);
      })
    );
  }

  getCarById(id: number): Observable<CarResponse> {
    console.log(`🚗 Buscando carro ID: ${id}`);
    return this.http.get<CarResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Carro encontrado:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar carro:', error);
        return throwError(() => error);
      })
    );
  }

  // Criar novo carro
  createCar(car: Omit<Car, 'id'>): Observable<CarResponse> {
    console.log('🚗 Criando novo carro:', car);
    return this.http.post<CarResponse>(this.apiUrl, car, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Carro criado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao criar carro:', error);
        return throwError(() => error);
      })
    );
  }

  // Atualizar carro
  updateCar(id: number, car: Partial<Car>): Observable<CarResponse> {
    console.log(`🚗 Atualizando carro ID: ${id}`, car);
    return this.http.put<CarResponse>(`${this.apiUrl}/${id}`, car, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Carro atualizado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao atualizar carro:', error);
        return throwError(() => error);
      })
    );
  }

  // Deletar carro
  deleteCar(id: number): Observable<CarResponse> {
    console.log(`🚗 Deletando carro ID: ${id}`);
    return this.http.delete<CarResponse>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('✅ Carro deletado com sucesso:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao deletar carro:', error);
        return throwError(() => error);
      })
    );
  }

  // Buscar carros por filtros
  searchCars(filters: {
    marca?: string;
    modelo?: string;
    anoMin?: number;
    anoMax?: number;
    precoMin?: number;
    precoMax?: number;
    cor?: string;
    disponivel?: boolean;
  }): Observable<CarResponse> {
    console.log('🔍 Buscando carros com filtros:', filters);
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    return this.http.get<CarResponse>(`${this.apiUrl}/search?${params.toString()}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap((response) => {
        console.log('📥 Carros filtrados encontrados:', response);
      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar carros filtrados:', error);
        return throwError(() => error);
      })
    );
  }
}
