import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input('item') item: Item;
  quantity = 0;

  constructor(
    private service: CartService
  ) { }

  ngOnInit(): void {
  }

  addItem() {
    this.service.addItem(this.item);
    this.quantity++;
  }

  removeItem() {
    this.service.removeItem(this.item);
    this.quantity--;
  }
}
