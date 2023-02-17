import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-product-order-details',
  templateUrl: './product-order-details.component.html',
  styleUrls: ['./product-order-details.component.scss']
})
export class ProductOrderDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private _router: Router, private userService: UserDataService){
    if(_router.url == '/orders-detail'){
      this._router.navigate(['orders']);
    }
  }
  products: Object[] = [];
  orderID: number = 0;
  ngOnInit():void {
    this.route.queryParams.subscribe(async params => {
      this.orderID = params['orderID'];
      (await this.userService.getOrderProducts(this.orderID)).subscribe({
        next: (res) => {
          console.log(res['message'])
          this.products = res[0];
          console.log(this.products)
      },
        error: (err) => {console.log(err)},
      })
    });
  }
}
