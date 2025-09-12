import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', pathMatch: 'full', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // rota para páginas não encontradas
];
