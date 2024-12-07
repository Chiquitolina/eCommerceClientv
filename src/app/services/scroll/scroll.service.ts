import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd) // Filtramos eventos de navegación
      )
      .subscribe(() => {
        window.scrollTo(0, 0); // Desplazamos la página a la parte superior
      });
  }
}
