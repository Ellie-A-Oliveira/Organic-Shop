import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Observable, Subscription } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  subs: Subscription[];
  @select((s: IAppState) => Object.values(s.itemsState.items)) $items: Observable<Item[]>;
  @select((s: IAppState) => s.itemsState.filter) $filter: Observable<string>;
  items: Item[];
  filter: string;

  constructor() { }

  ngOnInit() {
    this.subs = [this.$items.subscribe(
      items => {
        this.items = items;
      }
    ),
    this.$filter.subscribe(
      filter => {
        this.filter = filter;
      }
    )];
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  filteredItems() {
    if (this.filter) {
      return this.items.filter(item => item.category === this.filter);
    }
    return this.items;
  }
}
