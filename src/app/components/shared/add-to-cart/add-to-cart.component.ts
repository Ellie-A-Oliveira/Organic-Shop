import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  subs: Subscription;
  @Input('item') item: Item;
  @select((s: IAppState) => Object.values(s.cartState.cartItems)) cart: Observable<CartItem[]>;

  quantity = 0;

  constructor(
    private service: CartService
  ) { }

  ngOnInit(): void {
    this.subs = this.cart.subscribe(
      cartItems => {
        this.quantity = 0;
        cartItems.forEach(cartItem => {
          if (cartItem.itemId === this.item.id) {
            this.quantity = cartItem.quantity;
          }
        });
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addItem() {
    this.service.addItem(this.item);
  }

  removeItem() {
    this.service.removeItem(this.item);
  }
}
