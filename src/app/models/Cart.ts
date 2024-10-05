import { CartItem } from "./CartItem"

export interface Cart {
    items: CartItem[]
    finalPrice: number
    totalItems: number
}