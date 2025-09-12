import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { filter } from 'rxjs';
import { FilterComponent } from './pages/filter/filter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'filter', pathMatch: 'full', component:FilterComponent},
  { path: '**', redirectTo: 'login' } // rota para páginas não encontradas
];
