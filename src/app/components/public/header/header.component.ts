import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { carouselHeaderObject } from '../../../common/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  carouselHeaderObject = carouselHeaderObject

  showHeader: boolean = true;

  constructor(private router: Router) {
    // Oculta el header en rutas específicas
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showHeader = !currentRoute.startsWith('/admin');
    });
  }

}
