import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/Cart';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-cart',
  standalone: true,
  imports: [MatListModule, MatIconModule, CartItemsComponent, CheckoutComponent, MatButtonModule],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.scss'
})
export class SideCartComponent {

  cartSer = inject(CartService)
  dialog = inject(MatDialog);

  currentCart!: Cart;
  private cartSubscription!: Subscription;

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito
    this.cartSubscription = this.cartSer.cart$.subscribe((cart) => {
      this.currentCart = cart;
    });
  }

  getCurrentCart(): void {
    this.currentCart = this.cartSer.getCartValue();
  }

  public checkoutEvent(): void {
   /* side.toggle();*/
    this.openDialog('0ms', '0ms');
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

}
