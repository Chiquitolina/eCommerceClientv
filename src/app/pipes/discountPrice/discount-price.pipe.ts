import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {
  transform(price: number, discount: number): { originalPrice: number, discountedPrice: number } {
    if (discount > 0) {
      const discountedPrice = price - (price * discount / 100);
      return {
        originalPrice: price,
        discountedPrice: discountedPrice
      };
    } else {
      return {
        originalPrice: price,
        discountedPrice: price // Si no hay descuento, el precio con descuento es igual al original
      };
    }
  }
}
