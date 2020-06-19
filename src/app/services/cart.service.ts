import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../models/item.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];
  totalItems = 0;
  totalItemsChanged = new EventEmitter();

  constructor() { }

  addItem(item: Item) {
    if (!this.items.some(cartItem => item.id === cartItem.itemId)) {
      const newCartItem: CartItem = {
        quantity: 0,
        itemId: item.id,
        item
      };
      this.items.push(newCartItem);
    }

    const index = this.getCartItemIndex(item);

    this.updateQuantity(index, 'add');

    this.totalItems++;
    this.totalItemsChanged.emit(this.totalItems);
  }

  removeItem(item: Item) {
    if (!this.items.some(cartItem => item.id === cartItem.itemId)) {
      return;
    }
    const index = this.getCartItemIndex(item);
    this.updateQuantity(index, 'remove');

    if (this.items[index].quantity <= 0) {
      this.items.splice(index, 1);
    }

    this.totalItems--;
    this.totalItemsChanged.emit(this.totalItems);
  }

  updateQuantity(index, action) {
    if (typeof index === 'undefined') {
      return false;
    }

    switch (action) {
      case 'add':
        this.items[index].quantity++;
        break;
      case 'remove':
        this.items[index].quantity--;
        break;
      default:
        return false;
    }
    return true;
  }

  getCartItemIndex(item): number {
    let index: number;

    for (let i = 0; i < this.items.length; i++) {
      const cartItem = this.items[i];

      if (cartItem.itemId === item.id) {
        index = i;
        break;
      }
    }


    if (typeof index === 'undefined') {
      return -1;
    }
    return index;
  }
}
