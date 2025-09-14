import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService, DashboardData } from './home.service';
import { CarService, Car } from '../cars/car.service';
import { UserService, User } from '../users/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  featuredCars: Car[] = [];
  activeUsers: User[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private homeService: HomeService,
    private carService: CarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Usau auth para checar a validação
    this.loadFeaturedCars();
    this.loadActiveUsers();
    this.loadDashboardData();
  }

  loadDashboardData() {
    console.log('Carregando dados do dashboard...');
    this.isLoading = true;
    this.errorMessage = '';

    this.homeService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
        console.log('✅ Dashboard carregado:', data);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar dados do dashboard';
        console.error('❌ Erro no dashboard:', error);
      }
    });
  }

  loadFeaturedCars() {
    console.log('⭐ Carregando carros em destaque...');
    this.homeService.getFeaturedCars().subscribe({
      next: (cars) => {
        this.featuredCars = cars;
        console.log('✅ Carros em destaque carregados:', cars);
      },
      error: (error) => {
        console.error('❌ Erro ao carregar carros em destaque:', error);
      }
    });
  }

  loadActiveUsers() {
    console.log('👥 Carregando usuários ativos...');
    this.homeService.getActiveUsers().subscribe({
      next: (users) => {
        this.activeUsers = users;
        console.log('✅ Usuários ativos carregados:', users);
      },
      error: (error) => {
        console.error('❌ Erro ao carregar usuários ativos:', error);
      }
    });
  }

  // Botões de ação
  onRefreshData() {
    console.log('🔄 Atualizando dados...');
    this.loadDashboardData();
  }

  onViewAllCars() {
    console.log('🚗 Visualizando todos os carros...');
    this.loadFeaturedCars();
  }

  onViewAllUsers() {
    console.log('👥 Visualizando todos os usuários...');
    this.loadActiveUsers();
  }

  onAddNewCar() {
    console.log('➕ Adicionando novo carro...');
    // Implementar modal ou navegação para adicionar carro
  }

  onAddNewUser() {
    console.log('➕ Adicionando novo usuário...');
    // Implementar modal ou navegação para adicionar usuário
  }

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
      this.carService.deleteCar(car.id!).subscribe({
        next: () => {
          console.log('✅ Carro deletado com sucesso');
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('❌ Erro ao deletar carro:', error);
        }
      });
    }
  }

  onDeleteUser(user: User) {
    console.log('🗑️ Deletando usuário:', user);
    if (confirm(`Tem certeza que deseja deletar o usuário ${user.nome}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          console.log('✅ Usuário deletado com sucesso');
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('❌ Erro ao deletar usuário:', error);
        }
      });
    }
  }
}
