import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { Observable } from 'rxjs';
import { ICartState } from '../stores/cart.store';
import { CheckoutInfo } from '../models/checkout-info.model';
import { Order } from '../models/order.model';
import { LocalStorageService } from './local-storage.service';
import * as actions from '../stores/cart.actions';
import { User } from '../models/user.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = 'orders';

  @select((s: IAppState) => s.cartState) private cartState: Observable<ICartState>;

  constructor(
    private db: AngularFireDatabase,
    private redux: NgRedux<IAppState>,
    private localSt: LocalStorageService,
    private cartService: CartService
    ) { }

  placeOrder(checkoutInfo: CheckoutInfo) {
    const currentUser = JSON.parse(this.localSt.currentUser) as User;

    this.cartState.subscribe(
      cart => {
        this.cartService.getTotalPrice()
          .subscribe(
            totalPrice => {
              const order: Order = {
                name: checkoutInfo.name,
                cart: Object.values(cart.cartItems),
                totalPrice,
                address: checkoutInfo.address,
                date: new Date().toLocaleString()
              };

              this.db.list(this.url + '/' + currentUser.id).push(order)
                .then(_ => {
                  this.redux.dispatch({ type: actions.REMOVE_CART_ITEMS });
                  this.localSt.removeCart();
                });
            }
          ).unsubscribe();
      }
    ).unsubscribe();
  }

  getAllOrders() {
    return this.db.list(this.url).valueChanges();
  }

  getUserOrders() {
    const currentUser = JSON.parse(this.localSt.currentUser) as User;

    return this.db.list(this.url + '/' + currentUser.id).valueChanges();
  }
}
