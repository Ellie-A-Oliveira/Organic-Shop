import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from './models/cart.model';
import { CartService } from './services/cart.service';
import { ItemsService } from './services/items.service';
import { Subscription } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { LocalStorageService } from './services/local-storage.service';
import * as actions from './stores/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  itemsSubs: Subscription;
  title = 'organic-shop';
  cart: CartItem[];

  constructor(
    private cartService: CartService,
    private itemsService: ItemsService,
    private redux: NgRedux<IAppState>,
    private localSt: LocalStorageService
  ) {  }

  ngOnInit() {
    this.cart = Object.values(this.redux.getState().cartState);
    this.itemsSubs = this.itemsService.getAll().subscribe();

    if (this.localSt.cart) {
      this.redux.dispatch({ type: actions.LOAD_CART, body: JSON.parse(this.localSt.cart) });
    }
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }
}
