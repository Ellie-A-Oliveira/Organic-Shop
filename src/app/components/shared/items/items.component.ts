import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item.model';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  subs: Subscription;
  @select((s: IAppState) => Object.values(s.itemsState.items)) items: Item[];

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit(): void {
    this.subs = this.service.getAll().subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
