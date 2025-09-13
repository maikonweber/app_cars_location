import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ListService, ListItem, ListOptions } from './list.service';
import { Car } from '../cars/car.service';
import { User } from '../users/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items: ListItem[] = [];
  totalItems = 0;
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 10;
  isLoading = false;
  errorMessage = '';

  // Filtros e busca
  searchTerm = '';
  filterType: 'car' | 'user' | 'all' = 'all';
  filterStatus = '';
  sortBy = 'id';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private listService: ListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    console.log('📋 Carregando itens...');
    this.isLoading = true;
    this.errorMessage = '';

    const options: ListOptions = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      searchTerm: this.searchTerm || undefined,
      filters: {
        type: this.filterType,
        status: this.filterStatus || undefined
      }
    };

    this.listService.getAllItems(options).subscribe({
      next: (response) => {
        this.items = response.items;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        console.log('✅ Itens carregados:', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar itens';
        console.error('❌ Erro ao carregar itens:', error);
      }
    });
  }

  searchItems() {
    console.log('🔍 Buscando itens...');
    this.currentPage = 1;
    this.loadItems();
  }

  clearSearch() {
    console.log('🧹 Limpando busca...');
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadItems();
  }

  applyFilters() {
    console.log('🔍 Aplicando filtros...');
    this.currentPage = 1;
    this.loadItems();
  }

  clearFilters() {
    console.log('🧹 Limpando filtros...');
    this.filterType = 'all';
    this.filterStatus = '';
    this.sortBy = 'id';
    this.sortOrder = 'asc';
    this.currentPage = 1;
    this.loadItems();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadItems();
    }
  }

  changeItemsPerPage(limit: number) {
    this.itemsPerPage = limit;
    this.currentPage = 1;
    this.loadItems();
  }

  sortItems(column: string) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.loadItems();
  }

  // Botões de ação
  onViewDetails(item: ListItem) {
    console.log('🔍 Visualizando detalhes do item:', item);
    if (item.type === 'car') {
      this.onViewCarDetails(item.data as Car);
    } else {
      this.onViewUserDetails(item.data as User);
    }
  }

  onViewCarDetails(car: Car) {
    console.log('🔍 Visualizando detalhes do carro:', car);
    // Implementar navegação para detalhes do carro
  }

  onViewUserDetails(user: User) {
    console.log('🔍 Visualizando detalhes do usuário:', user);
    // Implementar navegação para detalhes do usuário
  }

  onEditItem(item: ListItem) {
    console.log('✏️ Editando item:', item);
    if (item.type === 'car') {
      this.onEditCar(item.data as Car);
    } else {
      this.onEditUser(item.data as User);
    }
  }

  onEditCar(car: Car) {
    console.log('✏️ Editando carro:', car);
    // Implementar edição do carro
  }

  onEditUser(user: User) {
    console.log('✏️ Editando usuário:', user);
    // Implementar edição do usuário
  }

  onDeleteItem(item: ListItem) {
    console.log('🗑️ Deletando item:', item);
    const confirmMessage = item.type === 'car' 
      ? `Tem certeza que deseja deletar o carro ${(item.data as Car).marca} ${(item.data as Car).modelo}?`
      : `Tem certeza que deseja deletar o usuário ${(item.data as User).nome}?`;

    if (confirm(confirmMessage)) {
      this.listService.deleteItem(item).subscribe({
        next: (success) => {
          if (success) {
            console.log('✅ Item deletado com sucesso');
            this.loadItems();
          } else {
            this.errorMessage = 'Erro ao deletar item';
          }
        },
        error: (error) => {
          this.errorMessage = 'Erro ao deletar item';
          console.error('❌ Erro ao deletar item:', error);
        }
      });
    }
  }

  onToggleStatus(item: ListItem) {
    console.log('🔄 Alterando status do item:', item);
    const newStatus = item.status === 'Disponível' || item.status === 'Ativo' 
      ? (item.type === 'car' ? 'Indisponível' : 'Inativo')
      : (item.type === 'car' ? 'Disponível' : 'Ativo');

    this.listService.updateItemStatus(item, newStatus).subscribe({
      next: (success) => {
        if (success) {
          console.log('✅ Status atualizado com sucesso');
          this.loadItems();
        } else {
          this.errorMessage = 'Erro ao atualizar status';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao atualizar status';
        console.error('❌ Erro ao atualizar status:', error);
      }
    });
  }

  onRefresh() {
    console.log('🔄 Atualizando lista...');
    this.loadItems();
  }

  onExport() {
    console.log('📤 Exportando lista...');
    // Implementar exportação da lista
  }

  onPrint() {
    console.log('🖨️ Imprimindo lista...');
    window.print();
  }

  onAddNew() {
    console.log('➕ Adicionando novo item...');
    // Implementar modal ou navegação para adicionar item
  }

  // Navegação
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToFilter() {
    this.router.navigate(['/filter']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}