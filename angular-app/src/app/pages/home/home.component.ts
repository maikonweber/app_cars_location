import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentCars = [];
  isLoading = false;
  errorMessage = '';
  cars = [];

  constructor(
    private homeService: HomeService,
    private router: Router) {}

  ngOnInit() {
    this.loadRecentCars();
  }

  loadRecentCars() {
    this.isLoading = true;
    this.errorMessage = '';

    this.homeService.getFeaturedCars().subscribe({
      next: (response) => {
        if (response) {
          console.log('🏠 Dados do dashboard carregados:', response);
          this.cars = response  ;

          console.log('🚗 Carros recentes carregados:', this.recentCars);
        } else {
          this.errorMessage = 'Falha ao carregar carros recentes';
          console.error('❌', this.errorMessage);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar carros recentes';
        console.error('❌', this.errorMessage, error);
        this.isLoading = false;
      }
    });
  }

  

  onCarClick(event: Event, car: any) {
    console.log('Carro selecionado:', car);
    // Implementar navegação para detalhes do carro
  }
}
