import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'

})
export class listComponent {
 itens = [
    { id: 1, nome: 'Item 1', descricao: 'Descrição do Item 1' },
    { id: 2, nome: 'Item 2', descricao: 'Descrição do Item 2' },
    { id: 3, nome: 'Item 3', descricao: 'Descrição do Item 3' }
  ];
}
