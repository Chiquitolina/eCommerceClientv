import { Component, ViewChild, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/public/header/header.component';
import { FooterComponent } from './shared/components/public/footer/footer.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { CartService } from './core/services/cart/cart.service';
import { CartItem } from './shared/models/CartItem';
import { Cart } from './shared/models/Cart';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; // Si usas tarjetas
import { MatDividerModule } from '@angular/material/divider'; // Si usas divisores
import { CartItemsComponent } from './shared/components/public/cart-items/cart-items.component';
import { Subscription } from 'rxjs';
import { DragDropService } from './core/services/dragdrop/drag-drop.service';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { SideCartComponent } from './shared/components/public/side-cart/side-cart.component';
import { ScrollService } from './core/services/scroll/scroll.service';
import { CartButtonsComponent } from './shared/components/public/cart-buttons/cart-buttons.component';
import { HttpClient } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire/app'; // Necesario para usar FirebaseApp
import { getAnalytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CartItemsComponent,
    FooterComponent,
    MatDividerModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    DragDropModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    AccordionModule,
    SideCartComponent,
    CartButtonsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'marketplace';

  @ViewChild('drawer') drawer!: MatDrawer;

  public cartSer = inject(CartService);
  dragDropService = inject(DragDropService);
  private http = inject(HttpClient);
  private scrollServ = inject(ScrollService)

  isSideCartOpen: boolean = false;

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  constructor(private router: Router, private firebaseApp: FirebaseApp) {
    const analytics = getAnalytics(this.firebaseApp); // Obtener Analytics

    // Escuchar eventos de navegación y enviar eventos a Firebase Analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Firebase Analytics debería enviar automáticamente eventos de vista de página
        logEvent(analytics, 'page_view', { page_path: event.urlAfterRedirects });
      }
    });
  }

  public cleanCartEvent() {
    this.cartSer.clearCart();
    this.drawer.opened ? this.drawer.toggle() : 0;
    this.isSideCartOpen = false;
  }

  // Método para abrir/cerrar el side cart
  toggleSideCart() {
    this.isSideCartOpen = !this.isSideCartOpen;
  }

  getCurrentCart(): void {
    this.currentCart = this.cartSer.getCartValue();
  }

  addProduct(cartItem: CartItem, productname: string) {
    this.cartSer.addItemToCart(cartItem);
    /* this._alertSer.showAlert(
      `¡Producto ${productname} añadido al carrito correctamente!`,
      'Cerrar',
      3000,
      'snackbar-success',
      productname
    );*/
  }

  onDrop() {
    const draggedItem = this.dragDropService.getDraggedItem();
    let product = draggedItem;
    if (draggedItem) {
      console.log(draggedItem);
      this.addProduct(
        { product, cantidad: 1, sizes: [{ size: '', quantity: 0 }] },
        draggedItem.name
      );
    }
    this.dragDropService.clearDraggedItem();
  }

  async toggleDrawer() {
    await this.drawer.toggle(); // Espera a que el drawer termine de abrirse o cerrarse
    this.toggleSideCart(); // Luego cambia el estado de isSideCartOpen
  }
}
