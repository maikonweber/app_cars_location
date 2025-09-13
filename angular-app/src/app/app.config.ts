import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { AuthInterceptor } from './pages/login/auth.intercepetos';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    { provide: CookieService, useClass: CookieService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
