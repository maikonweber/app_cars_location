import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';


// Create Cars Interface
interface Car {
  _id: number;
  nome: string;
  modelo: string;
  ano: number;
  numero_lugares: number;
  tipo_modelo: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentCars = [];
  isLoading = false;
  errorMessage = '';
  cars: Car[] | any = [] ;

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
      next: (response: any) => {
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
      error: (error: any) => {
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
