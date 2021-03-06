import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';
import { convertObjtoArr } from 'src/app/helper-functions/convertObjtoArr.helper';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  $orders: Observable<any>;
  converter = convertObjtoArr;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.$orders = this.orderService.getAllOrders();
  }

  viewOrder(order) {
    this.dialog.open(ViewOrderComponent, {
      data: order,
      minWidth: '40vw'
    });
  }

}
