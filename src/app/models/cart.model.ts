import { Item } from './item.model';

export interface CartItem {
    quantity: number;
    itemId: string;
    item: Item;
}
