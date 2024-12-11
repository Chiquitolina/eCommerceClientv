import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  showFooter: boolean = true;

  constructor(private router: Router) {
    // Oculta el header en rutas específicas
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showFooter = !currentRoute.startsWith('/admin');
    });
  }

}
