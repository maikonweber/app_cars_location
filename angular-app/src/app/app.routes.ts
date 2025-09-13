import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FilterComponent } from './pages/filter/filter.component';
import { AuthGuard } from './pages/login/auth.guard';

export const routes: Routes = [
  { 
    path: 'home', 
    pathMatch: 'full', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'filter', 
    pathMatch: 'full', 
    component: FilterComponent,
    canActivate: [AuthGuard]
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
