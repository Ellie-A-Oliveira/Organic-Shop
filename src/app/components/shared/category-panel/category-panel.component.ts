import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit, OnDestroy {
  private subs: Subscription;
  @select((s: IAppState) => {
    let categories = [];

    Object.values(s.itemsState.items).map(item => item.category)
      .forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    return categories;
  }) categories: Array<any>;

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit(): void {
    this.subs = this.service.getAll().subscribe();
  }

  filterBy(category: string) {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
