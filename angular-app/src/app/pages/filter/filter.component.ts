import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService, FilterOptions, FilterResults } from './filter.service';
import { Car } from '../cars/car.service';
import { User } from '../users/user.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterOptions: FilterOptions | null = null;
  filterResults: FilterResults | null = null;
  isLoading = false;
  errorMessage = '';

  // Filtros de carros
  carFilters = {
    marca: '',
    modelo: '',
    anoMin: null as number | null,
    anoMax: null as number | null,
    precoMin: null as number | null,
    precoMax: null as number | null,
    cor: '',
    disponivel: null as boolean | null
  };

  // Filtros de usuários
  userFilters = {
    nome: '',
    email: '',
    role: '',
    ativo: null as boolean | null,
    cidade: '',
    estado: ''
  };

  // Busca por texto
  searchTerm = '';
  searchType: 'cars' | 'users' | 'all' = 'all';

  constructor(private filterService: FilterService) {}

  ngOnInit() {
    this.loadFilterOptions();
  }

  loadFilterOptions() {
    console.log('🔍 Carregando opções de filtro...');
    this.isLoading = true;

    this.filterService.getFilterOptions().subscribe({
      next: (options) => {
        this.filterOptions = options;
        this.isLoading = false;
        console.log('✅ Opções de filtro carregadas:', options);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar opções de filtro';
        console.error('❌ Erro ao carregar opções:', error);
      }
    });
  }

  applyFilters() {
    console.log('🔍 Aplicando filtros...');
    this.isLoading = true;
    this.errorMessage = '';

    const filters = {
      carFilters: this.carFilters,
      userFilters: this.userFilters
    };

    this.filterService.applyFilters(filters).subscribe({
      next: (results) => {
        this.filterResults = results;
        this.isLoading = false;
        console.log('✅ Filtros aplicados:', results);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao aplicar filtros';
        console.error('❌ Erro ao aplicar filtros:', error);
      }
    });
  }

  searchByText() {
    if (!this.searchTerm.trim()) {
      this.filterResults = null;
      return;
    }

    console.log('🔍 Buscando por texto:', this.searchTerm);
    this.isLoading = true;
    this.errorMessage = '';

    if (this.searchType === 'cars' || this.searchType === 'all') {
      this.filterService.searchCarsByText(this.searchTerm).subscribe({
        next: (cars) => {
          this.filterResults = {
            cars,
            users: [],
            totalCars: cars.length,
            totalUsers: 0
          };
          this.isLoading = false;
          console.log('✅ Carros encontrados:', cars);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao buscar carros';
          console.error('❌ Erro na busca de carros:', error);
        }
      });
    }

    if (this.searchType === 'users' || this.searchType === 'all') {
      this.filterService.searchUsersByText(this.searchTerm).subscribe({
        next: (users) => {
          if (this.searchType === 'users' || this.searchType === 'all') {
            this.filterResults = {
              cars: this.searchType === 'all' ? (this.filterResults?.cars || []) : [],
              users,
              totalCars: this.searchType === 'all' ? (this.filterResults?.totalCars || 0) : 0,
              totalUsers: users.length
            };
          }
          this.isLoading = false;
          console.log('✅ Usuários encontrados:', users);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao buscar usuários';
          console.error('❌ Erro na busca de usuários:', error);
        }
      });
    }
  }

  clearFilters() {
    console.log('🧹 Limpando filtros...');
    this.carFilters = {
      marca: '',
      modelo: '',
      anoMin: null,
      anoMax: null,
      precoMin: null,
      precoMax: null,
      cor: '',
      disponivel: null
    };

    this.userFilters = {
      nome: '',
      email: '',
      role: '',
      ativo: null,
      cidade: '',
      estado: ''
    };

    this.searchTerm = '';
    this.filterResults = null;
  }

  clearSearch() {
    console.log('🧹 Limpando busca...');
    this.searchTerm = '';
    this.filterResults = null;
  }

  // Botões de ação
  onViewCarDetails(car: Car) {
    console.log('🔍 Visualizando detalhes do carro:', car);
    // Implementar navegação para detalhes do carro
  }

  onViewUserDetails(user: User) {
    console.log('🔍 Visualizando detalhes do usuário:', user);
    // Implementar navegação para detalhes do usuário
  }

  onEditCar(car: Car) {
    console.log('✏️ Editando carro:', car);
    // Implementar edição do carro
  }

  onEditUser(user: User) {
    console.log('✏️ Editando usuário:', user);
    // Implementar edição do usuário
  }

  onDeleteCar(car: Car) {
    console.log('🗑️ Deletando carro:', car);
    if (confirm(`Tem certeza que deseja deletar o carro ${car.marca} ${car.modelo}?`)) {
      // Implementar deleção do carro
      console.log('Carro deletado:', car);
    }
  }

  onDeleteUser(user: User) {
    console.log('🗑️ Deletando usuário:', user);
    if (confirm(`Tem certeza que deseja deletar o usuário ${user.nome}?`)) {
      // Implementar deleção do usuário
      console.log('Usuário deletado:', user);
    }
  }

  onExportResults() {
    console.log('📤 Exportando resultados...');
    // Implementar exportação dos resultados
  }

  onPrintResults() {
    console.log('🖨️ Imprimindo resultados...');
    window.print();
  }
}
