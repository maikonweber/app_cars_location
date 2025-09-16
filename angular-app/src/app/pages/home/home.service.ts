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



}
