import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Cart } from '../../../models/Cart';
import { CartService } from '../../../services/cart/cart.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-buttons',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './cart-buttons.component.html',
  styleUrl: './cart-buttons.component.scss'
})
export class CartButtonsComponent {

  @Output() toggleDrawer = new EventEmitter<void>();
  @Output() cleanCart = new EventEmitter<void>();

  currentCart!: Cart;
  showCartButtons: boolean = true;

  private cartSer = inject(CartService)
  private router = inject(Router)
  private cartSubscription!: Subscription;

  constructor() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showCartButtons = !currentRoute.startsWith('/admin');
    });
  }

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito
    this.cartSubscription = this.cartSer.cart$.subscribe((cart) => {
      this.currentCart = cart;
    });
  }

  toggleDrawerEmit() {
    this.toggleDrawer.emit()
  }

  cleanCartEmit() {
    this.cleanCart.emit()
  }

}
