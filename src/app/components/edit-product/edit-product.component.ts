import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IItemsState } from 'src/app/stores/items.store';
import { Item } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemConsentComponent } from '../delete-item-consent/delete-item-consent.component';
import { UpdateSuccessfulComponent } from '../update-successful/update-successful.component';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  private subs: Subscription[];

  private itemId: string;
  item: Promise<Item>;

  constructor(
    private route: ActivatedRoute,
    private redux: NgRedux<IItemsState>,
    private itemService: ItemsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs = [
      this.route.paramMap
        .subscribe(params => this.itemId = params.get('itemId')),
      this.redux.select('itemsState')
        .subscribe((itemState: IItemsState) => {
          Object.values(itemState.items).forEach(item => {
            if (item.id.toString() === this.itemId) {
              this.item = Promise.resolve(item);
            }
          });
        })
    ];
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  updateProduct(item: Item) {
    this.itemService.update(item)
      .then(_ => {
        this.dialog.open(UpdateSuccessfulComponent, {
          minWidth: '40vw'
        });

        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

  deleteProduct(item: Item) {
    const dialogRef = this.dialog.open(DeleteItemConsentComponent, {
      minWidth: '40vw'
    });

    dialogRef.afterClosed().subscribe(
      (consent: boolean | undefined) => {
        if (consent) {
          this.itemService.delete(item);

          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      }
    );
  }

}
