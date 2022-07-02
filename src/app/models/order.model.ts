import { CartItem } from './cart.model';
import { Address } from './address.model';

export interface Order {
    cart: CartItem[];
    totalPrice: number;
    date: string;
    name: string;
    address: Address;
}
