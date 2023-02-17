import { Component, DoCheck, OnInit } from '@angular/core';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products: string [] = [];
  constructor(protected localStorageService: LocalstorageserviceService){
  }
  // getting Data of products from LocalStorage.
  ngOnInit(){
    this.localStorageService.getProductsFromCart().subscribe({
      next: (res) => {this.products = res['products'], this.localStorageService.cartProducts = res['products']},
      error: (err) => {console.log(err)},
      complete: () => {}
    })
  }
}
