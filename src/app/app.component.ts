import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from './models/cart.model';
import { CartService } from './services/cart.service';
import { ItemsService } from './services/items.service';
import { Subscription } from 'rxjs';

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
    private itemsService: ItemsService
  ) {  }

  ngOnInit() {
    this.cart = this.cartService.items;
    this.itemsSubs = this.itemsService.getAll().subscribe();
  }

  ngOnDestroy() {
    this.itemsSubs.unsubscribe();
  }
}
