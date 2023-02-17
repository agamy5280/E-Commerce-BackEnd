import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { WishlistService } from 'src/app/services/localstorage/wishlist.service';
import { ProductserviceService } from 'src/app/services/product/productservice.service';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {
  recentProducts = [];
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(private prodService:ProductserviceService,
    private _router: Router,
    private localStorageService: LocalstorageserviceService,
    private wishListService: WishlistService){}
  // Getting Recent Product From API on Load.
  async ngOnInit(): Promise<void> {
    (await this.prodService.getRecentProducts()).subscribe((data:any)=>{
      this.recentProducts = Object.values(data);
    })
  }
  // Redirecting to Product Page onClick.
  redirectToProductPage(id:number){
    this._router.navigate(['shop-detail'], {
      queryParams: {
        product: id,
      },
    });
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
  addProductToWishList(productID: number) {
    if(this.myLocalStorageUserData){
      this.wishListService.addProductToWishlist(productID).subscribe({
        next: (res) => alert(res['message']),
        error: (err) => {if(err.error.message === "Unauthenticated.") this._router.navigate(['/login'])},
      })
      }else {
        this._router.navigate(['/login'])
      }
  }
  
}
