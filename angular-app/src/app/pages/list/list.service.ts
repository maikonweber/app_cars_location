import { Injectable } from '@angular/core';
import { CarService, Car } from '../cars/car.service';
import { UserService, User } from '../users/user.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ListItem {
  id: number;
  type: 'car' | 'user';
  title: string;
  subtitle: string;
  description?: string;
  status: string;
  data: Car | User;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  searchTerm?: string;
  filters?: {
    type?: 'car' | 'user' | 'all';
    status?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(
    private carService: CarService,
    private userService: UserService
  ) { }

  // Buscar todos os itens (carros e usuários) combinados
  // getAllItems(options: ListOptions = { page: 1, limit: 10 }): Observable<{
  //   items: ListItem[];
  //   total: number;
  //   page: number;
  //   totalPages: number;
  // }> {
  //   console.log('📋 Buscando todos os itens...', options);
    
   
}
