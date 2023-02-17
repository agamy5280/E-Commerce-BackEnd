import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { OrderserviceService } from 'src/app/services/order/orderservice.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  myUserLocalStorage = JSON.parse(localStorage.getItem('userData') || '{}');
  products: string [] = [];
  userInformation: string = this.myUserLocalStorage.data
  // checkStatusOfOrder = false;
  constructor(protected localStorageService: LocalstorageserviceService, private orderService: OrderserviceService, private _router: Router){}

  ngOnInit() {
    this.localStorageService.getProductsFromCart().subscribe({
      next: (res) => {this.products = res['products'], this.localStorageService.cartProducts = res['products']},
      error: (err) => {console.log(err)},
      complete: () => {}
    })
    // if(this.localStorageService.getSubTotal()) this.checkStatusOfOrder = true
  }

  placeOrder() {
    let subTotal: number = this.localStorageService.getSubTotal()
    let shipping: number = this.localStorageService.getQuantity() * 10
    let total: number = this.localStorageService.getTotal()
      this.orderService.placeOrder(subTotal, shipping, total).subscribe({
        next: (res) => {alert(res['message'])},
        error: (err) => {alert(err.error['message'])},
        complete: () => {this._router.navigate(['home'])}
      })
  }
}
