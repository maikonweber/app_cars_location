import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Car {
  id: number;
  name: string;
  type: string;
  engine: string;
  seats: string;
  image: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cars: Car[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.isLoading = true;
    this.errorMessage = '';

    // Simulando carregamento de dados
    setTimeout(() => {
      this.cars = [
        {
          id: 1,
          name: 'Mini Cooper - 2021',
          type: 'Hatch compacto',
          engine: 'Motor 1.8',
          seats: '5 Lugares',
          image: 'assets/cars/mini.png'
        },
        {
          id: 2,
          name: 'Ford Ka',
          type: 'Hatch compacto',
          engine: 'Motor 1.0',
          seats: '5 Lugares',
          image: 'assets/cars/ford-ka.png'
        },
        {
          id: 3,
          name: 'Duster',
          type: 'SUV compacto',
          engine: 'Motor 1.6',
          seats: '5 Lugares',
          image: 'assets/cars/duster.png'
        },
        {
          id: 4,
          name: 'Jeep Compass',
          type: 'SUV Médio',
          engine: 'Motor 1.8',
          seats: '7 Lugares',
          image: 'assets/cars/jeep.png'
        },
        {
          id: 5,
          name: 'Toro',
          type: 'Picape leve',
          engine: 'Motor 2.0',
          seats: '5 Lugares',
          image: 'assets/cars/toro.png'
        },
        {
          id: 6,
          name: 'T-Cross',
          type: 'SUV compacto',
          engine: 'Motor 1.4',
          seats: '5 Lugares',
          image: 'assets/cars/t-cross.png'
        },
        {
          id: 7,
          name: 'Strada',
          type: 'Picape leve',
          engine: 'Motor 1.6',
          seats: '5 Lugares',
          image: 'assets/cars/strada.png'
        },
        {
          id: 8,
          name: 'Saveiro',
          type: 'Picape leve',
          engine: 'Motor 1.6',
          seats: '5 Lugares',
          image: 'assets/cars/saveiro.png'
        },
        {
          id: 9,
          name: 'Versa',
          type: 'Sedan Compacto',
          engine: 'Motor 1.6',
          seats: '5 Lugares',
          image: 'assets/cars/versa.png'
        },
        {
          id: 10,
          name: 'Jetta',
          type: 'Sedan Médio',
          engine: 'Motor 2.0',
          seats: '5 Lugares',
          image: 'assets/cars/jetta.png'
        },
        {
          id: 11,
          name: 'Doblo',
          type: 'Utilitário leve',
          engine: 'Motor 1.8',
          seats: '7 Lugares',
          image: 'assets/cars/doblo.png'
        },
        {
          id: 12,
          name: 'Fiorino',
          type: 'Utilitário leve',
          engine: 'Motor 1.4',
          seats: '2 Lugares',
          image: 'assets/cars/fiorino.png'
        },
        {
          id: 13,
          name: 'Partner',
          type: 'Utilitário leve',
          engine: 'Motor 1.6',
          seats: '2 Lugares',
          image: 'assets/cars/partner.png'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  onCarClick(car: Car) {
    console.log('Carro selecionado:', car);
    // Implementar navegação para detalhes do carro
  }
}