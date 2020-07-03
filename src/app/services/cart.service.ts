import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../models/item.model';
import { CartItem } from '../models/cart.model';
import { NgRedux, select } from '@angular-redux/store';
import { ICartState } from '../stores/cart.store';
import * as actions from '../stores/cart.actions';
import { IAppState } from '../store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  @select((s: IAppState) => s.cartState) cart: Observable<CartItem>;

  constructor(
    private redux: NgRedux<ICartState>,
    private localSt: LocalStorageService
  ) { }

  addItem(item: Item) {
    const cartItem: CartItem = {
      quantity: 1,
      item,
      itemId: item.id
    };

    this.redux.dispatch({ type: actions.ADD_CART_ITEM, body: cartItem });
    this.updateLocalCart();
  }

  removeItem(item: Item) {
    const cartItem: CartItem = {
      quantity: 1,
      item,
      itemId: item.id
    };
    this.redux.dispatch({ type: actions.REMOVE_CART_ITEM, body: cartItem });
    this.updateLocalCart();
  }

  getTotalPrice(): Observable<number> {
    return this.redux.select().pipe(
      map((s: IAppState) => {
        const cartItems = Object.values(s.cartState.cartItems);
        let totalPrice = 0;

        cartItems.forEach(cartItem => {
          totalPrice += cartItem.quantity * cartItem.item.price;
        });

        return totalPrice;
      })
    );

  }

  updateLocalCart() {
    this.cart.subscribe(
      cartObj => this.localSt.cart = JSON.stringify(cartObj)
    );
  }
}
