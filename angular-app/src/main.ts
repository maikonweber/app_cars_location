// main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app'; // Componente raiz standalone
import { LoginComponent } from './app/pages/login/login.component';
import { HomeComponent } from './app/pages/home/home.component';
import { FilterComponent } from './app/pages/filter/filter.component';
import { provideZoneChangeDetection } from '@angular/core';
import { AuthGuard } from './app/pages/login/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'filter', component: FilterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));