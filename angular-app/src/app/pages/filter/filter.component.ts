import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService, Car } from '../cars/car.service';

interface FilteredCar extends Car {
  type: string;
  engine: string;
  seats: string;
  image: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  allCars: Car[] = [];
  filteredCars: FilteredCar[] = [];
  isLoading = false;
  errorMessage = '';

  // Filtros
  searchTerm = '';
  selectedBodyTypes: string[] = [];
  selectedEngines: string[] = [];
  selectedSeats: string[] = [];

  // Opções de filtros
  bodyTypes = [
    'Hatch compacto', 'Hatch médio', 'SUV compacto', 'SUV médio', 'SUV grande',
    'Crossover', 'Coupé', 'Picape leve', 'Picape leve-média', 'Picape média',
    'Sedan Compacto', 'Sedan Médio', 'Sedan Grande', 'Minivan/monovolume',
    'Utilitário leve', 'Utilitário'
  ];

  engines = ['Motor 1.0', 'Motor 1.4', 'Motor 1.5', 'Motor 1.8', 'Motor 2.0'];
  seats = ['02', '03', '04', '05', '06', '07'];

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllCars();
  }

  loadAllCars() {
    console.log('🚗 Carregando todos os carros...');
    this.isLoading = true;
    this.errorMessage = '';

    this.carService.getAllCars().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.allCars = response.data;
          this.transformCarsForDisplay();
          this.applyFilters();
        } else {
          this.errorMessage = 'Erro ao carregar dados dos carros';
        }
        this.isLoading = false;
        console.log('✅ Carros carregados:', this.allCars);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar carros';
        console.error('❌ Erro ao carregar carros:', error);
      }
    });
  }

  transformCarsForDisplay() {
    this.filteredCars = this.allCars.map(car => ({
      ...car,
      type: this.getCarType(car),
      engine: this.getEngineType(car),
      seats: this.getSeatsCount(car),
      image: this.getCarImage(car)
    }));
  }

  getCarType(car: Car): string {
    // Mapear baseado na marca/modelo para tipos de carroceria
    const model = car.modelo.toLowerCase();
    if (model.includes('hatch') || model.includes('ka') || model.includes('gol')) {
      return 'Hatch compacto';
    } else if (model.includes('compass') || model.includes('toro') || model.includes('duster')) {
      return 'SUV Médio';
    } else if (model.includes('sedan') || model.includes('jetta') || model.includes('versa')) {
      return 'Sedan Médio';
    } else if (model.includes('picape') || model.includes('strada') || model.includes('saveiro')) {
      return 'Picape leve';
    } else if (model.includes('utilitario') || model.includes('doblo') || model.includes('fiorino')) {
      return 'Utilitário leve';
    }
    return 'SUV compacto';
  }

  getEngineType(car: Car): string {
    // Mapear baseado no ano para tipo de motor
    if (car.ano >= 2020) return 'Motor 2.0';
    if (car.ano >= 2018) return 'Motor 1.8';
    if (car.ano >= 2016) return 'Motor 1.6';
    if (car.ano >= 2014) return 'Motor 1.4';
    return 'Motor 1.0';
  }

  getSeatsCount(car: Car): string {
    // Mapear baseado no tipo de carro
    const type = this.getCarType(car);
    if (type.includes('Utilitário')) return '2 Lugares';
    if (type.includes('SUV') || type.includes('Picape')) return '7 Lugares';
    return '5 Lugares';
  }

  getCarImage(car: Car): string {
    // Mapear para imagens baseadas na marca/modelo
    const model = car.modelo.toLowerCase();
    if (model.includes('mini')) return 'assets/cars/mini.png';
    if (model.includes('compass')) return 'assets/cars/jeep.png';
    if (model.includes('ka')) return 'assets/cars/ford-ka.png';
    if (model.includes('duster')) return 'assets/cars/duster.png';
    if (model.includes('toro')) return 'assets/cars/toro.png';
    if (model.includes('t-cross')) return 'assets/cars/t-cross.png';
    if (model.includes('strada')) return 'assets/cars/strada.png';
    if (model.includes('saveiro')) return 'assets/cars/saveiro.png';
    if (model.includes('versa')) return 'assets/cars/versa.png';
    if (model.includes('jetta')) return 'assets/cars/jetta.png';
    if (model.includes('doblo')) return 'assets/cars/doblo.png';
    if (model.includes('fiorino')) return 'assets/cars/fiorino.png';
    if (model.includes('partner')) return 'assets/cars/partner.png';
    return 'assets/cars/default.png';
  }

  applyFilters() {
    console.log('🔍 Aplicando filtros...');
    let filtered = [...this.filteredCars];

    // Filtro por busca de texto
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(car => 
        car.marca.toLowerCase().includes(searchLower) ||
        car.modelo.toLowerCase().includes(searchLower) ||
        car.type.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por tipo de carroceria
    if (this.selectedBodyTypes.length > 0) {
      filtered = filtered.filter(car => 
        this.selectedBodyTypes.includes(car.type)
      );
    }

    // Filtro por motor
    if (this.selectedEngines.length > 0) {
      filtered = filtered.filter(car => 
        this.selectedEngines.includes(car.engine)
      );
    }

    // Filtro por lugares
    if (this.selectedSeats.length > 0) {
      filtered = filtered.filter(car => 
        this.selectedSeats.some(seat => car.seats.includes(seat))
      );
    }

    this.filteredCars = filtered;
    console.log('✅ Filtros aplicados. Carros encontrados:', filtered.length);
  }

  onBodyTypeChange(bodyType: string, checked: boolean) {
    if (checked) {
      this.selectedBodyTypes.push(bodyType);
    } else {
      this.selectedBodyTypes = this.selectedBodyTypes.filter(type => type !== bodyType);
    }
    this.applyFilters();
  }

  onEngineChange(engine: string) {
    if (this.selectedEngines.includes(engine)) {
      this.selectedEngines = this.selectedEngines.filter(e => e !== engine);
    } else {
      this.selectedEngines = [engine]; // Apenas um motor selecionado por vez
    }
    this.applyFilters();
  }

  onSeatChange(seat: string) {
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats = [seat]; // Apenas uma quantidade de lugares por vez
    }
    this.applyFilters();
  }

  clearFilters() {
    console.log('🧹 Limpando filtros...');
    this.searchTerm = '';
    this.selectedBodyTypes = [];
    this.selectedEngines = [];
    this.selectedSeats = [];
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCarClick(car: FilteredCar) {
    console.log('Carro selecionado:', car);
    // Implementar navegação para detalhes do carro
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
