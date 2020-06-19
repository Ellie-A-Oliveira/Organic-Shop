import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Observable<Item[]>;

  constructor(
    private service: ItemsService
  ) { }

  ngOnInit(): void {
    this.items = this.service.getAll() as unknown as Observable<Item[]>;
  }

}
