import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HomeService } from './home.service';
import { Router } from '@angular/router';


// Create Cars Interface
export interface Car {
  _id: string;               // vem como string, não number
  nome: string;
  modelo?: string;           // não existe no retorno, mas deixa opcional se usar depois
  ano: number;
  numero_de_lugares: number;
  tipo_modelo: string;
  potencia_do_motor: number;
  url: string;
  reservedBy?: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  providers: [HomeService],
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
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadCars();
    console.log(this.cars)
  }


  onSubmitReserve() {
    this.homeService
  }

  loadCars() {
    this.isLoading = true;
    this.errorMessage = '';

   
  }

  

  onCarClick(event: Event, car: any) {
    console.log('Carro selecionado:', car);
    // Implementar navegação para detalhes do carro
  }
}
