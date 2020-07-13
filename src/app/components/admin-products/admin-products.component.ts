import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { searchBy } from '../../helper-functions/searchBy.helper';
import { resizableGrid } from '../../helper-functions/resizableTable.helper';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  actionSelected: boolean;
  numOrder: {order: string, selected: boolean} = {order: undefined, selected: false};
  titleOrder: {order: string, selected: boolean} = {order: undefined, selected: false};
  priceOrder: {order: string, selected: boolean} = {order: undefined, selected: false};

  @select((s: IAppState) => Object.values(s.itemsState.items)) $items: Observable<Item[]>;
  items: Item[];
  filteredItems: Item[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.actionSelected = this.route.children.length === 0 ? false : true;
    this.$items
      .subscribe(items => {
        this.filteredItems = items;
        this.items = items;
      });
  }

  ngAfterViewInit(): void {
    const table = document.getElementById('items-table');
    resizableGrid(table);
  }

  createProduct() {
    this.toggleActionSelected();
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  editProduct(item: Item) {
    this.toggleActionSelected();
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }

  toggleActionSelected() {
    this.actionSelected = !this.actionSelected;

    if (this.route.children.length > 0) {
      this.router.navigate(['../products'], { relativeTo: this.route });
    }
  }

  onSearch(text) {
    this.filteredItems = this.items;
    if (text) {
      this.filteredItems = searchBy(text, this.items);
    }
  }

  orderBy(type: string) {
    let orderObj;

    switch (type.toLowerCase()) {
      case '#':
        this.toggleOrder(this.numOrder);

        orderObj = this.numOrder;

        orderObj.order === 'asc' ? this.sortAsc(type) : this.sortDes(type);
        break;
      case 'title':
        this.toggleOrder(this.titleOrder);

        orderObj = this.titleOrder;

        orderObj.order === 'asc' ? this.sortAsc(type) : this.sortDes(type);
        break;
      case 'price':
        this.toggleOrder(this.priceOrder);

        orderObj = this.priceOrder;

        orderObj.order === 'asc' ? this.sortAsc(type) : this.sortDes(type);
        break;
    }
  }

  sortAsc(type: string) {
    switch (type.toLowerCase()) {
      case '#':
        break;
      case 'title':
        this.filteredItems.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'price':
        this.filteredItems.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          } else if (a.price < b.price) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
    }
  }

  sortDes(type: string) {
    switch (type.toLowerCase()) {
      case '#':
        break;
      case 'title':
        this.filteredItems.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (a.name < b.name) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'price':
        this.filteredItems.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
    }
  }

  toggleOrder(orderObj: {order: string, selected: boolean}) {
    const orders = [this.numOrder, this.priceOrder, this.titleOrder];
    orders.forEach(order => {
      if (order !== orderObj) {
        order.selected = false;
      } else {
        order.selected = true;
      }
    });

    if (!orderObj) { orderObj.order = 'asc'; } else {
      orderObj.order = orderObj.order === 'asc' ? 'des' : 'asc';
    }
  }
}
