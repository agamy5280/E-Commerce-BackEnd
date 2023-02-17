import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { ProductserviceService } from 'src/app/services/product/productservice.service';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements AfterViewInit, OnInit {
  productID: number = 0;
  targetProductData = [];
  productCategory: string = '';
  youMayLikeProducts = [];
  youMayLikeProductsID: number = 0;
  userReviews = [];
  userReviewsQuantity: number = 0;
  productRating: number;
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(private route: ActivatedRoute,
      private _router: Router,
      private prodService:ProductserviceService,
      protected localStorageService: LocalstorageserviceService){
    // checking if path shop-detail is active.
    if(_router.url == '/shop-detail'){
      this._router.navigate(['shop']);
    }
  }
  ngAfterViewInit(): void {
    // Related carousel
    setTimeout(()=>{
      $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
          0: {
            items: 1,
          },
          576: {
            items: 2,
          },
          768: {
            items: 3,
          },
          992: {
            items: 4,
          },
        },
      });
    },1000)
  }
  async ngOnInit(){
    //getting product data
    this.route.queryParams.subscribe(async params => {
      this.productID = params['product'];
      (await this.prodService.getProductByID(this.productID)).subscribe(async (data:any) => {
        this.targetProductData = data;
        this.productCategory = data.category;
        this.productRating = Number(JSON.stringify(data.rating));
        // Getting products similar in category.
        (await this.prodService.getProductsBySearch(this.productCategory, '', '', '', null, null)).subscribe((data:any) => {
          this.youMayLikeProducts = data.products;
        });
        // Getting user reviews from API.
        (await this.prodService.getUserReviews()).subscribe((data:any) => {
          this.userReviews = data.users;
          this.userReviewsQuantity = this.userReviews.length;
        })
      });
    })
  }
  // Navigate to Product Detail page with product ID.
  redirectToProductPage(id:number){
    this._router.navigate(['shop-detail']);
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
}
