import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'ecommerce-cart';

  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    finalPrice: 0,
    totalItems: 0,
  });

  cart$: Observable<Cart> = this.cartSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const expirationTime = 60 * 60 * 1000;

      if (Date.now() - parsedCart.timestamp < expirationTime) {
        this.cartSubject.next(parsedCart);
      } else {
        localStorage.removeItem(this.cartKey);
      }
    }

    this.cart$.subscribe((cart) => {
      const cartWithTimestamp = { ...cart, timestamp: Date.now() };
      localStorage.setItem(this.cartKey, JSON.stringify(cartWithTimestamp));
    });
  }

  addItemToCart(cartItem: CartItem): void {
    const currentCart = this.cartSubject.value;

    const foundItem = currentCart.items.find(
      (item) => item.product.name === cartItem.product.name
    );

    let updatedItems;
    if (foundItem) {
      updatedItems = currentCart.items.map((item) =>
        item.product.name === cartItem.product.name
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      const newItem = { ...cartItem, cantidad: 1 };
      updatedItems = [...currentCart.items, newItem];
    }

    const updatedCart = {
      ...currentCart,
      items: updatedItems,
      finalPrice: currentCart.finalPrice + Number(cartItem.product.price),
      totalItems: currentCart.totalItems + 1, // Incrementamos totalItems en 1
    };

    // Actualizamos el BehaviorSubject con el nuevo carrito
    this.cartSubject.next(updatedCart);
  }

  // Método para remover un ítem del carrito
  removeItemFromCart(cartItem: CartItem): void {
    const currentCart = this.cartSubject.value;

    const updatedItems = currentCart.items.filter(
      (item) => item.product.name !== cartItem.product.name
    );

    const updatedCart = {
      ...currentCart,
      items: updatedItems,
      finalPrice:
        currentCart.finalPrice - cartItem.product.price * cartItem.cantidad,
      totalItems: updatedItems.length,
    };

    // Emitimos el nuevo estado del carrito
    this.cartSubject.next(updatedCart);
  }

  // Método para limpiar el carrito
  clearCart(): void {
    this.cartSubject.next({
      items: [],
      finalPrice: 0,
      totalItems: 0,
    });
  }

  // Método para obtener el carrito actual sin suscribirse
  getCartValue(): Cart {
    return this.cartSubject.value;
  }
}
