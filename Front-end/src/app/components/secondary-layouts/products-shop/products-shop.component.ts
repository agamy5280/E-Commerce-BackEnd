import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/product/productservice.service';
import {orderBy} from 'lodash';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { WishlistService } from 'src/app/services/localstorage/wishlist.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { count } from 'rxjs';
@Component({
  selector: 'app-products-shop',
  templateUrl: './products-shop.component.html',
  styleUrls: ['./products-shop.component.scss']
})
export class ProductsShopComponent implements OnInit {
  products: [] = [];
  categoryName: string = '';
  searchedProduct: string = '';
  productsQuantity: number;
  page: number;
  minPrice: number;
  maxPrice: number;
  @Output() productsQuantityPrices = new EventEmitter<number>();
  sortingOptions: string[] = [
    'Stock: Low to High',
    'Stock: High to Low',
    'Price: Low to High',
    'Price: High to Low',
    'Best Rating',
    'Clear'
  ]
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(private prodService: ProductserviceService,
       private _router: Router,
       private route: ActivatedRoute,
       private localStorageService: LocalstorageserviceService,
       private wishListService: WishlistService){
  }

    // Getting products according to User's choice.
  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      if(params['search']){
        this.searchedProduct = params['search'];
        (await this.prodService.getProductsBySearch('', '', this.searchedProduct, '', null, null)).subscribe((data:any)=>{
          console.log(data);
          this.products = data.products;
          this.productsQuantity = data.sortCount;
          this.page = 0;
        })
      }else if(params['category']){
        this.categoryName = params['category'];
        (await this.prodService.getProductsBySearch(this.categoryName, '', '', '', null, null)).subscribe((data:any) => {
          this.products = data.products;
          this.productsQuantity = data.sortCount;
          this.page = 0;
        })
      }else if(params['minPrice'] && params['maxPrice'] ){
        this.minPrice = params['minPrice'];
        this.maxPrice = params['maxPrice'];
        (await this.prodService.getProductsBySearch('', '', '', '', this.minPrice, this.maxPrice)).subscribe((data:any) => {
          this.products = data.products;
          this.productsQuantity = data.sortCount;
          this.page = 0;
        })
      }else if(params['sortBy']){
        let sort: string;
        if(params['sortBy'] == 'Stock: High to Low'){
          sort = 'stock_desc';
        }
        else if(params['sortBy'] == 'Stock: Low to High'){
          sort = 'stock_asc';
        }
        else if(params['sortBy'] == 'Price: Low to High'){
          sort = 'price_asc';
        }
        else if(params['sortBy'] == 'Price: High to Low'){
          sort = 'price_desc';
        }
        else if(params['sortBy'] == 'Best Rating'){
          sort = 'rating_desc';
        }else{
          this._router.navigate(['shop'])
        }
        if(sort) {
          (await this.prodService.getProductsBySearch('', '', '', sort, null, null)).subscribe((data:any) => {
            this.products = data.products;
            this.productsQuantity = data.sortCount;
            this.page = 0;
          })
        }
      }
      else {
         (await this.prodService.getProductsBySearch('', '', '', '', null, null)).subscribe((data:any)=>{
          this.products = data.products;
          this.productsQuantity = data.sortCount;
          this.page = 0;
        })
      }
    })
  }
  // Redirecting to Product Page with Product ID.
  redirectToProductPage(id:number){
    this._router.navigate(['shop-detail'], {
      queryParams: {
        product: id,
      },
    });
  }
  // Changing Params to Which SortingOption User Want.
  showProductsBySorting(sortingOption){
    this._router.navigate([],{
      queryParams:{
        sortBy: sortingOption
      }
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
