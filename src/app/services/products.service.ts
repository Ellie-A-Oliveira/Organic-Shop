import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly url = 'items';

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll(): Observable<any> {
    return this.db.list(this.url).valueChanges();
  }

  get(itemId: string): Observable<any> {
    return this.db.list(this.url + '/' + itemId).valueChanges();
  }

  add(item: Item): Promise<void> {
    return this.db.object(this.url + '/' + item.id).set(item);
  }

  update(item: Item): Promise<void> {
    return this.db.object(this.url + '/' + item.id).set(item);
  }

  delete(itemId: string): Promise<void> {
    return this.db.object(this.url + '/' + itemId).remove();
  }

  createItemId(): string {
    return this.db.createPushId();
  }
}
