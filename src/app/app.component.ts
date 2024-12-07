import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/public/header/header.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { CartService } from './services/cart/cart.service';
import { CartItem } from './models/CartItem';
import { Cart } from './models/Cart';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; // Si usas tarjetas
import { MatDividerModule } from '@angular/material/divider'; // Si usas divisores
import { CartItemsComponent } from './components/public/cart-items/cart-items.component';
import { Subscription } from 'rxjs';
import { DragDropService } from './services/dragdrop/drag-drop.service';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { SideCartComponent } from './components/public/side-cart/side-cart.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'marketplace';

  @ViewChild('drawer') drawer!: MatDrawer;

  public cartSer = inject(CartService);
  dragDropService = inject(DragDropService);

  isSideCartOpen: boolean = false;

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  public cleanCartEvent() {
    this.cartSer.clearCart();
    this.drawer.opened ? this.drawer.toggle() : 0;
    this.isSideCartOpen = false;
  }

  // Método para abrir/cerrar el side cart
  toggleSideCart() {
    this.isSideCartOpen = !this.isSideCartOpen;
  }

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito
    this.cartSubscription = this.cartSer.cart$.subscribe((cart) => {
      this.currentCart = cart;
    });
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
      console.log('Producto agregado al carrito:', draggedItem);
    }
    this.dragDropService.clearDraggedItem();
  }

  async toggleDrawer() {
    await this.drawer.toggle(); // Espera a que el drawer termine de abrirse o cerrarse
    this.toggleSideCart(); // Luego cambia el estado de isSideCartOpen
  }
}
