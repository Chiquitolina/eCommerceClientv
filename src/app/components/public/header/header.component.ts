import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { carouselHeaderObject } from '../../../common/constants';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  carouselHeaderObject = carouselHeaderObject
  showHeader: boolean = true;

  private router = inject(Router)

  constructor() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showHeader = !currentRoute.startsWith('/admin');
    });
  }

}
