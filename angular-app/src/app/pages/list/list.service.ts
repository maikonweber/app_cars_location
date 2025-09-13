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
  getAllItems(options: ListOptions = { page: 1, limit: 10 }): Observable<{
    items: ListItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    console.log('📋 Buscando todos os itens...', options);
    
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

        // Converter carros para ListItem
        const carItems: ListItem[] = carsData.map(car => ({
          id: car.id || 0,
          type: 'car' as const,
          title: `${car.marca} ${car.modelo}`,
          subtitle: `${car.ano} • ${car.cor} • R$ ${car.preco.toLocaleString('pt-BR')}`,
          description: car.descricao || `Placa: ${car.placa}`,
          status: car.disponivel ? 'Disponível' : 'Indisponível',
          data: car
        }));

        // Converter usuários para ListItem
        const userItems: ListItem[] = usersData.map(user => ({
          id: user.id || 0,
          type: 'user' as const,
          title: user.nome,
          subtitle: user.email,
          description: user.telefone ? `Tel: ${user.telefone}` : undefined,
          status: user.ativo ? 'Ativo' : 'Inativo',
          data: user
        }));

        // Combinar e filtrar itens
        let allItems = [...carItems, ...userItems];

        // Aplicar filtros
        if (options.filters?.type && options.filters.type !== 'all') {
          allItems = allItems.filter(item => item.type === options.filters!.type);
        }

        if (options.filters?.status) {
          allItems = allItems.filter(item => 
            item.status.toLowerCase().includes(options.filters!.status!.toLowerCase())
          );
        }

        // Aplicar busca por texto
        if (options.searchTerm) {
          const term = options.searchTerm.toLowerCase();
          allItems = allItems.filter(item => 
            item.title.toLowerCase().includes(term) ||
            item.subtitle.toLowerCase().includes(term) ||
            (item.description && item.description.toLowerCase().includes(term))
          );
        }

        // Aplicar ordenação
        if (options.sortBy) {
          allItems.sort((a, b) => {
            let aValue: any, bValue: any;
            
            if (options.sortBy === 'title') {
              aValue = a.title;
              bValue = b.title;
            } else if (options.sortBy === 'status') {
              aValue = a.status;
              bValue = b.status;
            } else if (options.sortBy === 'type') {
              aValue = a.type;
              bValue = b.type;
            } else {
              aValue = a.id;
              bValue = b.id;
            }

            if (options.sortOrder === 'desc') {
              return bValue > aValue ? 1 : -1;
            } else {
              return aValue > bValue ? 1 : -1;
            }
          });
        }

        // Aplicar paginação
        const total = allItems.length;
        const totalPages = Math.ceil(total / options.limit);
        const startIndex = (options.page - 1) * options.limit;
        const endIndex = startIndex + options.limit;
        const paginatedItems = allItems.slice(startIndex, endIndex);

        return {
          items: paginatedItems,
          total,
          page: options.page,
          totalPages
        };
      })
    );
  }

  // Buscar apenas carros
  getCars(options: ListOptions = { page: 1, limit: 10 }): Observable<{
    items: ListItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.getAllItems({ ...options, filters: { ...options.filters, type: 'car' } });
  }

  // Buscar apenas usuários
  getUsers(options: ListOptions = { page: 1, limit: 10 }): Observable<{
    items: ListItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.getAllItems({ ...options, filters: { ...options.filters, type: 'user' } });
  }

  // Buscar itens por texto
  searchItems(searchTerm: string, options: ListOptions = { page: 1, limit: 10 }): Observable<{
    items: ListItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    return this.getAllItems({ ...options, searchTerm });
  }

  // Deletar item (carro ou usuário)
  deleteItem(item: ListItem): Observable<boolean> {
    console.log(`🗑️ Deletando ${item.type} ID: ${item.id}`);
    
    if (item.type === 'car') {
      return this.carService.deleteCar(item.id).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    } else {
      return this.userService.deleteUser(item.id).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }
  }

  // Atualizar status do item
  updateItemStatus(item: ListItem, newStatus: string): Observable<boolean> {
    console.log(`🔄 Atualizando status do ${item.type} ID: ${item.id} para: ${newStatus}`);
    
    if (item.type === 'car') {
      const car = item.data as Car;
      return this.carService.updateCar(item.id, { 
        disponivel: newStatus === 'Disponível' 
      }).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    } else {
      const user = item.data as User;
      return this.userService.updateUser(item.id, { 
        ativo: newStatus === 'Ativo' 
      }).pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }
  }
}
