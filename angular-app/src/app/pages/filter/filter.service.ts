import { Injectable } from '@angular/core';
import { CarService, Car } from '../cars/car.service';
import { UserService, User } from '../users/user.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface FilterOptions {
  carBrands: string[];
  carColors: string[];
  carYears: number[];
  userRoles: string[];
  userCities: string[];
  userStates: string[];
}

export interface FilterResults {
  cars: Car[];
  users: User[];
  totalCars: number;
  totalUsers: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(
    private carService: CarService,
    private userService: UserService
  ) { }

  // Buscar opções de filtro disponíveis
  getFilterOptions(): Observable<FilterOptions> {
    console.log('🔍 Buscando opções de filtro...');
    
    return forkJoin({
      cars: this.carService.getAllCars().pipe(
        catchError(() => of({ success: false, data: [] }))
      ),
      users: this.userService.getAllUsers().pipe(
        catchError(() => of({ success: false, data: [] }))
      )
    }).pipe(
      map(({ cars, users }) => {
        const carsData = Array.isArray(cars.data) ? cars.data : [];
        const usersData = Array.isArray(users.data) ? users.data : [];

        // Extrair marcas únicas dos carros
        const carBrands = [...new Set(carsData.map(car => car.marca))].sort();
        
        // Extrair cores únicas dos carros
        const carColors = [...new Set(carsData.map(car => car.cor))].sort();
        
        // Extrair anos únicos dos carros
        const carYears = [...new Set(carsData.map(car => car.ano))].sort((a, b) => b - a);
        
        // Extrair roles únicos dos usuários
        const userRoles = [...new Set(usersData.map(user => user.role))].sort();
        
        // Extrair cidades únicas dos usuários
        const userCities = [...new Set(usersData
          .filter(user => user.endereco?.cidade)
          .map(user => user.endereco!.cidade)
        )].sort();
        
        // Extrair estados únicos dos usuários
        const userStates = [...new Set(usersData
          .filter(user => user.endereco?.estado)
          .map(user => user.endereco!.estado)
        )].sort();

        return {
          carBrands,
          carColors,
          carYears,
          userRoles,
          userCities,
          userStates
        };
      })
    );
  }

  applyFilters(filters: {
    carFilters?: {
      marca?: string;
      modelo?: string;
      anoMin?: number;
      anoMax?: number;
      precoMin?: number;
      precoMax?: number;
      cor?: string;
      disponivel?: boolean;
    };
    userFilters?: {
      nome?: string;
      email?: string;
      role?: string;
      ativo?: boolean;
      cidade?: string;
      estado?: string;
    };
  }): Observable<FilterResults> {
    console.log('🔍 Aplicando filtros:', filters);
    
    const carSearch$ = filters.carFilters 
      ? this.carService.searchCars(filters.carFilters).pipe(
          catchError(() => of({ success: false, data: [] }))
        )
      : this.carService.getAllCars().pipe(
          catchError(() => of({ success: false, data: [] }))
        );

    const userSearch$ = filters.userFilters
      ? this.userService.searchUsers(filters.userFilters).pipe(
          catchError(() => of({ success: false, data: [] }))
        )
      : this.userService.getAllUsers().pipe(
          catchError(() => of({ success: false, data: [] }))
        );

    return forkJoin({
      cars: carSearch$,
      users: userSearch$
    }).pipe(
      map(({ cars, users }) => {
        const carsData = Array.isArray(cars.data) ? cars.data : [];
        const usersData = Array.isArray(users.data) ? users.data : [];

        return {
          cars: carsData,
          users: usersData,
          totalCars: carsData.length,
          totalUsers: usersData.length
        };
      })
    );
  }

  // Buscar carros por texto
  searchCarsByText(searchTerm: string): Observable<Car[]> {
    console.log('🔍 Buscando carros por texto:', searchTerm);
    
    return this.carService.getAllCars().pipe(
      map(response => {
        const cars = Array.isArray(response.data) ? response.data : [];
        const term = searchTerm.toLowerCase();
        
        return cars.filter(car => 
          car.marca.toLowerCase().includes(term) ||
          car.modelo.toLowerCase().includes(term) ||
          car.cor.toLowerCase().includes(term) ||
          car.placa.toLowerCase().includes(term) ||
          (car.descricao && car.descricao.toLowerCase().includes(term))
        );
      }),
      catchError(() => of([]))
    );
  }

  // Buscar usuários por texto
  searchUsersByText(searchTerm: string): Observable<User[]> {
    console.log('🔍 Buscando usuários por texto:', searchTerm);
    
    return this.userService.getAllUsers().pipe(
      map(response => {
        const users = Array.isArray(response.data) ? response.data : [];
        const term = searchTerm.toLowerCase();
        
        return users.filter(user => 
          user.nome.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          (user.telefone && user.telefone.toLowerCase().includes(term)) ||
          (user.cpf && user.cpf.toLowerCase().includes(term)) ||
          (user.endereco?.cidade && user.endereco.cidade.toLowerCase().includes(term)) ||
          (user.endereco?.estado && user.endereco.estado.toLowerCase().includes(term))
        );
      }),
      catchError(() => of([]))
    );
  }
}
