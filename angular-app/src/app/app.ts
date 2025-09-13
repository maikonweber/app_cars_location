import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div style="width:100%;height:100%;">
  <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.css']
})
export class App {
}