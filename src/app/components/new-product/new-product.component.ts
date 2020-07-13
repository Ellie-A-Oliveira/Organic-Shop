import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  item: Item;

  constructor(
    private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.item = {
      name: '',
      price: 0,
      category: '',
      imgUrl: '',
      id: this.itemService.createItemId()
    };
  }

  addProduct() {
    this.itemService.add(this.item);
    this.router.navigate(['../../products'], { relativeTo: this.route });
  }

}
