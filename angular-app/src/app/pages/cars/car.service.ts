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

  reserveCar(carId: string): Observable<any> {
  console.log(`🚗 Reservando carro ID: ${carId}`);

  return this.http.post<any>(`${this.apiUrl}/reserve`, 
    { carId }, // body
    { headers: this.getAuthHeaders() }
  ).pipe(
    tap((response) => {
      console.log("✅ Reserva realizada com sucesso!", response);
    }),
    catchError((error) => {
      console.error('💥 Erro ao reservar carro:', error);
      return throwError(() => error);
    })
  );
}
  	
// Error: Bad Request

// Response body
// Download
// {
//   "message": "Usuário já possui uma reserva ativa. Só é permitido alugar 1 carro por vez.",
//   "error": "Bad Request",
//   "statusCode": 400
// }

// Curl

// curl -X 'POST' \
//   'http://localhost:3000/cars/reserve' \
//   -H 'accept: */*' \
//   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGM5YWFjN2NjMDY0N2IzZDMxNGQ3YzUiLCJuYW1lIjoiSm9obiBEb2UiLCJ1c2VybmFtZSI6Im1haWtvbndlYmVyMSIsInBhc3N3b3JkIjoiOTEzY2JjOWE2NGIzZTliZmY4MDAwMzI0ZjRlM2Y4NDc0YmNhY2Y2YWYwMmQxNWE4N2EwNjVmYTM1Zjg5MzY3YWFkNzJiMDJmMGRmNTlkYzE1NGU0YTUwYjlhNWI5ZmMyZjMyY2U1Y2ZjNDNiZjMxOGQwYTIxZWZhNDhhYTk2YWIiLCJzYWx0IjoiODFlNDcyMDkzYWFjIiwiY3JlYXRlZEF0IjoiMjAyNS0wOS0xNlQxODoyMTo1OS4zMzlaIiwidXBkYXRlZEF0IjoiMjAyNS0wOS0xNlQxODoyMTo1OS4zMzlaIiwiX192IjowLCJpYXQiOjE3NTgxMTk5NDksImV4cCI6MTc1ODU1MTk0OX0.vxeUDyfrcrh5Ir2e-PiC1IZq5ls32Mo4FrTwCw149gE' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "carId": "68c58bc4e24d5fe41fba465f"
// }'

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
