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
        console.log(response)
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

      }),
      catchError((error) => {
        console.error('💥 Erro ao buscar carro:', error);
        return throwError(() => error);
      })
    );
  }

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
