import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category/categoryservice.service';

@Component({
  selector: 'app-categories-homepage',
  templateUrl: './categories-homepage.component.html',
  styleUrls: ['./categories-homepage.component.scss']
})
export class CategoriesHomepageComponent implements OnInit {
  categories = [];
  constructor(private catService: CategoryserviceService, private _router: Router){}
  // Getting Categories From API on Load.
  ngOnInit(): void {
    this.catService.getCategories().subscribe((data:any)=>{
      this.categories = data;
    })
  }
  // Redirecting to Category page in shop onClick.
  goToCategoriesProducts(category){
    this._router.navigate(['shop'], {
      queryParams: {
        category: category,
      },
    });
  }
}
