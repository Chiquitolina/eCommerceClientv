import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { CartService } from './services/cart/cart.service';
import { CartItem } from './models/CartItem';
import { Cart } from './models/Cart';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card'; // Si usas tarjetas
import { MatDividerModule } from '@angular/material/divider'; // Si usas divisores
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { Subscription } from 'rxjs';
import { DragDropService } from './services/dragdrop/drag-drop.service';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

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
    MatListModule,
    MatToolbarModule,
    DragDropModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    AccordionModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'marketplace';

  @ViewChild('drawer') drawer!: MatDrawer;

  public cartSer = inject(CartService);
  dialog = inject(MatDialog);
  dragDropService = inject(DragDropService)

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  public checkoutEvent(side: any): void {
    side.toggle();
    this.openDialog('0ms', '0ms');
  }

  public cleanCartEvent() {
    this.cartSer.clearCart();
    this.drawer.opened ? this.drawer.toggle() : 0;
  }

  public removeItem(
    itemcart: CartItem,
    drawer: MatDrawer,
    productname: string
  ) {
    this.cartSer.removeItemFromCart(itemcart);
    /* this.alertsServ.showAlert(
      `¡Producto ${productname} removido del carrito correctamente!`,
      'Cerrar',
      4000,
      '',
      productname
    );*/
  }

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito
    this.cartSubscription = this.cartSer.cart$.subscribe((cart) => {
      this.currentCart = cart;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CheckoutComponent, {
      width: '140%',
      height: '100%',
      enterAnimationDuration,
      exitAnimationDuration,
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
      console.log(draggedItem)
      this.addProduct({product, cantidad: 1, priceconjunto: 0}, draggedItem.name)
      console.log('Producto agregado al carrito:', draggedItem);
    }
    this.dragDropService.clearDraggedItem();
  }
}
