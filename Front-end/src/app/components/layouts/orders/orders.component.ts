import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(private userService: UserDataService, private _router: Router) {}
  Orders: object = [];
  async ngOnInit(): Promise<void> {
    (await this.userService.getOrders()).subscribe({
      next: (res) => {this.Orders = res, console.log(this.Orders)},
      error: (err) => {console.log(err)},
      complete: () => {}
    })
  }
  viewOrderDetail(orderID: number) {
    this._router.navigate(['orders-detail'], {
      queryParams: {
        orderID: orderID,
      },
    });
  }
}
