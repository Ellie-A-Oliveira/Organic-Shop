import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-category-panel',
  templateUrl: './category-panel.component.html',
  styleUrls: ['./category-panel.component.scss']
})
export class CategoryPanelComponent implements OnInit {
  items: Observable<Item[]>; // categories may be repeated, fix

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit(): void {
    this.items = this.service.getAll() as unknown as Observable<Item[]>;
  }

}
