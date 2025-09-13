// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app'; // Componente raiz standalone
import { LoginComponent } from './app/pages/login/login.component';
import { HomeComponent } from './app/pages/home/home.component';
import { FilterComponent } from './app/pages/filter/filter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'filter', component: FilterComponent },
  { path: '**', redirectTo: 'login' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
});
