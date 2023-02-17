import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CategoryserviceService } from 'src/app/services/category/categoryservice.service';
import { LocalstorageserviceService } from 'src/app/services/localstorage/localstorageservice.service';
import { WishlistService } from 'src/app/services/localstorage/wishlist.service';
import { LoginserviceService } from 'src/app/services/user/loginservice.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, DoCheck {
  categories = [];
  cartQuantity: number = 0;
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(private catService: CategoryserviceService,
       protected loginService: LoginserviceService,
       private _router: Router,
       protected localStorageService: LocalstorageserviceService,
       protected wishListService: WishlistService){
  }
  // Getting Categories on Load.
  ngOnInit(): void {
    this.catService.getCategories().subscribe((data:any)=>{
      this.categories = data;
    })
  }
  ngDoCheck() {
    this.cartQuantity = this.localStorageService.getQuantity();
  }
  // remove user data from local storage
  async logout() {
    
    (await this.loginService.logoutRequest()).subscribe({
      next: (res) => {
      },
      error: (err) => {alert(err.error.message)},
      complete: () => {
        localStorage.removeItem('userData');
        this._router.navigate(['home']).then(() => {
          window.location.reload();
        });
      },
    }
    )
  }
  goToCategoriesProducts(category){
    this._router.navigate(['shop'], {
      queryParams: {
        category: category,
      },
    });
  }
}
