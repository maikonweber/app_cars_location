import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- IMPORTANTE!
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class listComponent {
  
  itens: any[] = [];
  
  constructor(private http: HttpClient, private router: Router) {
    this.fetchItems();
  }

  // Função para buscar cookie e inteceptar requisições
  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  fetchItems() {
    const token = this.getCookie('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.http.get<any[]>('http://localhost:3000/itens', {
      headers: { 'Authorization': `Bearer ${token}`   
    } 
    }).subscribe({
      next: data => {
        this.itens = data;
      },
      error: err => {
        console.error('Erro ao buscar itens', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }
}