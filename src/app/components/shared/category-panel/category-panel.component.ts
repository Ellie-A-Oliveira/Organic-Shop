import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import { Subscription, Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit {
  @select((s: IAppState) => {
    const categories = [];

    Object.values(s.itemsState.items).map(item => item.category)
      .forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    return categories;
  }) categories: Observable<any[]>;

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit(): void {
  }

  filterBy(category: string) {
    this.service.filter(category);
  }

  setActive(li: HTMLLIElement) {
    const ul = li.parentElement.parentElement;

    for (let index = 0; index < ul.childElementCount; index++) {
      const element = ul.children.item(index).children[0]; // li

      if (element === li) {
        element.classList.add('active');
      } else {
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        }
      }
    }
  }
}
