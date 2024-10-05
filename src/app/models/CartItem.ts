import { Product } from "./Products";

export interface CartItem {
    product: Product,
    cantidad: number,
    priceconjunto: number
}