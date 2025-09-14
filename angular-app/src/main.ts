// main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideZoneChangeDetection } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptor/auth.interceptos';

if (typeof window !== 'undefined') { // garante que estamos no browser
  bootstrapApplication(App, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideHttpClient(
        withFetch(),
        withInterceptorsFromDi() // 🔥 habilita interceptors vindos do DI
      ),
      provideRouter(routes),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // 🔥 registra o AuthInterceptor
    ]
  }).catch(err => console.error(err));
}
