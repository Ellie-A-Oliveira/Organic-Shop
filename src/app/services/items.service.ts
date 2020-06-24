import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from '../models/item.model';
import { NgRedux } from '@angular-redux/store';
import { IItemsState } from '../stores/items.store';
import { map } from 'rxjs/operators';
import * as actions from '../stores/items.actions';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly url = 'items';

  constructor(
    private db: AngularFireDatabase,
    private redux: NgRedux<IItemsState>
  ) { }

  getAll() {
    return this.db.list(this.url).valueChanges().pipe(
      map(items => this.redux.dispatch({ type: actions.LOAD_ITEMS, body: items }))
    );
  }

  // Check necessity for this method
  get(id) {
    return this.db.object(this.url + '/' + id).valueChanges();
  }

  add(item: Item) {
    this.redux.dispatch({ type: actions.ADD_ITEM, body: item });

    return this.db.list(this.url).push(item);
  }

  update(item: Item) {
    return this.db.object(this.url + '/' + item.id).set(item);
  }

  delete(item: Item) {
    return this.db.object(this.url + '/' + item.id).remove();
  }

  createItemId(): string {
    return this.db.createPushId();
  }

  filter(category: string) {
    this.redux.dispatch({ type: actions.FILTER_ITEMS, body: category });
  }
}
