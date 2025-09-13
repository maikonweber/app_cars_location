import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from '../src/app/pages/login/login.component'; // precisa importar
import { HomeComponent } from '../src/app/pages/home/home.component';      // precisa importar
import { FilterComponent } from '../src/app/pages/filter/filter.component'; // precisa importar

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'filter', component: FilterComponent },
  { path: '**', redirectTo: 'login' } // rota fallback
];

bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient()
  ]
});
