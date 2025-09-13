import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FilterComponent } from './pages/filter/filter.component';

export const routes: Routes = [
  { 
    path: 'home', 
    pathMatch: 'full', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'filter', 
    pathMatch: 'full', 
    component: FilterComponent
  },
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
