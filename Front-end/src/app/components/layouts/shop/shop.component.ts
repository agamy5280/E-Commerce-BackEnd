import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category/categoryservice.service';
import { ProductserviceService } from 'src/app/services/product/productservice.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categories = [];
  selectedCategory: string;
  selectedCategoriesIndex: number;
  isCheckedAllCategories: boolean = true;
  isCheckedCustomSearch: boolean = false;
  prices: {
    minPrice: number;maxPrice: number;
  } [] = [{
      minPrice: 0,
      maxPrice: 50
    },
    {
      minPrice: 50,
      maxPrice: 100
    },
    {
      minPrice: 100,
      maxPrice: 500
    },
    {
      minPrice: 500,
      maxPrice: 1000
    },
    {
      minPrice: 1000,
      maxPrice: 2000
    }
  ]
  selectedPriceIndex: number;
  minPrice: number;
  maxPrice: number;
  isCheckedAllPrices: boolean = true;
  quantity: number = 0 ;
  constructor(private catService: CategoryserviceService, private _router: Router, private route: ActivatedRoute, ) {}
  ngOnInit(): void {
    // Generating categories on load
    this.catService.getCategories().subscribe((data: any) => {
      this.categories = data;
    })
    this.route.queryParams.subscribe(params => {
      // Handling Checkboxes on Shop page.
      if (params['search']) {
        this.isCheckedCustomSearch = true;
        this.selectedCategoriesIndex = -1;
        this.isCheckedAllCategories = false;
      } else if (params['category']) {
        this.isCheckedCustomSearch = false;
        this.isCheckedAllCategories = false;
      } else if(params['sortBy']){
        this.isCheckedAllCategories = false;
        this.selectedCategoriesIndex = -1;
        this.isCheckedCustomSearch = true;
      }
      else {
        this.isCheckedCustomSearch = false;
        this.isCheckedAllCategories = true;
      }
    })
     // Retrieve selected category from local storage
     const selectedCategory = localStorage.getItem('selectedCategory');
     if (selectedCategory) {
       this.selectedCategory = selectedCategory;
     }
 
     // Retrieve selected price range from local storage
     const minPrice = localStorage.getItem('minPrice');
     const maxPrice = localStorage.getItem('maxPrice');
     if (minPrice && maxPrice) {
       this.minPrice = parseInt(minPrice);
       this.maxPrice = parseInt(maxPrice);
     }
  }
  changeSelectionCategories(event, index) {
    // If checkboxes are not selected
    this.selectedCategoriesIndex = event.target.checked ? index : undefined;
    if (event.target.checked == false) {
      this.isCheckedAllCategories = true;
      this.selectedCategory = '';
      localStorage.removeItem('selectedCategory');
      this._router.navigate([], {
        relativeTo: this.route,
      });
    } else {
      // If checkboxes are selected
      this.selectedCategory = event.target.value;
      this.isCheckedAllCategories = false;
      localStorage.setItem('selectedCategory', this.selectedCategory);
      this._router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          category: this.selectedCategory,
        },
      });
    }
  }
  // Navigating to selected price range of products and handling checkboxes.
  changeSelectionPrices(event, index, minPrice, maxPrice) {
    this.selectedPriceIndex = event.target.checked ? index : undefined;
    if (event.target.checked == false) {
      this.isCheckedCustomSearch = false;
      this.isCheckedAllPrices = true;
      localStorage.removeItem('minPrice');
      localStorage.removeItem('maxPrice');
      this._router.navigate([], {
        relativeTo: this.route,
      });
    } else {
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
      this.isCheckedAllPrices = false;
      this.isCheckedCustomSearch = true;
      localStorage.setItem('minPrice', minPrice.toString());
      localStorage.setItem('maxPrice', maxPrice.toString());
      this._router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          filterPrice: '',
          minPrice: minPrice,
          maxPrice: maxPrice,
        }
      });
    }
  }
}
