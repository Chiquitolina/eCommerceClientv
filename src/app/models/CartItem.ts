import { Product } from './Products';
import { SizeQuantity } from './SizeQuantity';
export interface CartItem {
  product: Product;
  cantidad: number,
  sizes: SizeQuantity[];
}
