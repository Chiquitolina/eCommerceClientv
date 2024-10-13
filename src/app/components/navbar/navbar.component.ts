import { Component, inject } from '@angular/core';
import { STORE_NAVBAR_MENU } from '../../common/constants';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CategoriesService } from '../../services/categories/categories.service';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { ReplaceCharPipe } from '../../pipes/replaceChar/replace-char.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    HttpClientModule,
    MenubarModule,
    CommonModule,
    RouterLink,
    CapitalizePipe,
    ReplaceCharPipe,
    InputTextModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [CategoriesService],
})
export class NavbarComponent {
  
  categoriesServ = inject(CategoriesService);
  categories: Array<any> = [];
  menuMap: { [key: number]: any } = {}; // Definimos el objeto menuMap

  public isMenuOpen: boolean = false;

  items: MenuItem[] | undefined;

  public navbarMenu: any[];

  constructor() {
    this.navbarMenu = STORE_NAVBAR_MENU;
  }

  ngOnInit() {
    this.categoriesServ.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e),
    });
  }

}
