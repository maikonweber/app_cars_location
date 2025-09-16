import { Injectable } from '@angular/core';
import { CarService, Car } from '../cars/car.service';
import { UserService, User } from '../users/user.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { response } from 'express';

export interface DashboardData {
  totalCars: number;
  totalUsers: number;
  availableCars: number;
  activeUsers: number;
  recentCars: Car[];
  recentUsers: User[];
  stats: {
    carsByBrand: { [key: string]: number };
    usersByRole: { [key: string]: number };
  };
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private carService: CarService,
    private userService: UserService
  ) { }



  // Buscar dados do dashboard
  getDashboardData(): Observable<DashboardData> {
    console.log('🏠 Buscando dados do dashboard...');
    
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

        // Calcular estatísticas
        const availableCars = carsData.filter(car => car.disponivel).length;
        const activeUsers = usersData.filter(user => user.ativo).length;

        // Estatísticas por marca
        const carsByBrand = carsData.reduce((acc, car) => {
          acc[car.marca] = (acc[car.marca] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        // Estatísticas por role
        const usersByRole = usersData.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        // Carros e usuários recentes (últimos 5)
        const recentCars = carsData
          .sort((a, b) => (b.id || 0) - (a.id || 0))
          .slice(0, 5);

        const recentUsers = usersData
          .sort((a, b) => (b.id || 0) - (a.id || 0))
          .slice(0, 5);

        return {
          totalCars: carsData.length,
          totalUsers: usersData.length,
          availableCars,
          activeUsers,
          recentCars,
          recentUsers,
          stats: {
            carsByBrand,
            usersByRole
          }
        };
      })
    );
  }

  getFeaturedCars(): Observable<Car[]> {
    console.log('⭐ Buscando carros em destaque...');
    return this.carService.getAllCars().pipe(
      map(response => {
        const cars = Array.isArray(response) ? response : [];
        return cars
          .slice(0, 6);
      }),
      catchError(() => of([]))
    );
  }

  getCars(): Observable<Car[]> {
    console.log('🚗 Buscando todos os carros...')
    return this.carService.getAllCars().pipe(
    map(response => {
      const cars = Array.isArray(response.data) ? response.data : []
        return cars
        }), 
        catchError(() => of([]))
      )
    }
  ;

  reserverCars(): Observable<Car> {
    return this.carService.getCarReserveById().pipe(
      map(response => {
        
      }),
      catchError(() => of([]))
    )
  }

}
