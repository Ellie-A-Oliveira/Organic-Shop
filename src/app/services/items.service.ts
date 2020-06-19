import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private readonly url = 'items';

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll() {
    return this.db.list(this.url).valueChanges();
  }

  // Check necessity for this method
  get(id) {
    return this.db.object(this.url + '/' + id).valueChanges();
  }

  add(item: Item) {
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
}
