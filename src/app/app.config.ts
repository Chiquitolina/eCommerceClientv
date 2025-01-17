import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorHandlerInterceptor } from './core/interceptors/error.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAQPmVF2dFhC3H_MEmlILN2vWywpjQOrUg",
      authDomain: "e-commerce-aig.firebaseapp.com",
      projectId: "e-commerce-aig",
      storageBucket: "e-commerce-aig.firebasestorage.app",
      messagingSenderId: "764891309061",
      appId: "1:764891309061:web:c533add86594d1def3686c",
      measurementId: "G-HB4ESNR87B"
    })),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
  ],
};
