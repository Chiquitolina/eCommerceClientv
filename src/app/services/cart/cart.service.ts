import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../../models/Cart';
import { CartItem } from '../../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Creamos un BehaviorSubject para el carrito
  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    finalPrice: 0,
    totalItems: 0,
  });

  // Observable del carrito
  cart$: Observable<Cart> = this.cartSubject.asObservable();

  // Método para agregar un ítem al carrito
// Método para agregar un ítem al carrito
addItemToCart(cartItem: CartItem): void {
  const currentCart = this.cartSubject.value;

  // Verificamos si el ítem ya existe en el carrito
  const foundItem = currentCart.items.find(
    (item) => item.product.name === cartItem.product.name
  );

  let updatedItems;
  if (foundItem) {
    // Si el ítem ya existe, incrementamos la cantidad
    updatedItems = currentCart.items.map((item) =>
      item.product.name === cartItem.product.name
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  } else {
    // Si el ítem no existe, lo agregamos con cantidad inicial 1
    const newItem = { ...cartItem, cantidad: 1 }; // Inicializamos cantidad a 1
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
