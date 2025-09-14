// main.ts
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { App } from './app/app';
// import { routes } from './app/app.routes';
import { routes } from './app/app.routes';
import { provideZoneChangeDetection } from '@angular/core';

if (typeof window !== 'undefined') { // garante que estamos no browser
  bootstrapApplication(App, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideHttpClient(withFetch()),
      provideRouter(routes)
    ]
  }).catch(err => console.error(err));
}