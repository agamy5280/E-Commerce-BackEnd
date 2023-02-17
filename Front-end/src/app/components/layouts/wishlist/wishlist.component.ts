import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { WishlistService } from 'src/app/services/localstorage/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  products: string [] = [];
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(protected wishListService: WishlistService, private _router: Router, private localStorageService: LocalstorageserviceService ){}
   // getting Data of products from LocalStorage.
   ngOnInit(){
    this.wishListService.getProductsFromWishlist().subscribe({
      next: (res) => {this.products = res['products'], this.localStorageService.cartProducts = res['products']},
      error: (err) => {console.log(err)},
      complete: () => {}
    })
  }
  
  addProductToCart(id: number) {
    if(this.myLocalStorageUserData){
      this.localStorageService.addProductToCart(id).subscribe({
        next: (res) => alert(res['message']),
        error: (err) => {if(err.error.message === "Unauthenticated.") this._router.navigate(['/login'])},
      })
    }else {
      this._router.navigate(['/login'])
    }
  }
}
