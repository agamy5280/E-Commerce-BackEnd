import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from 'src/app/services/product/productservice.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit{
  currentRoute: string = '';
  currentKey: string = '';
  currentParams: string = '';

constructor(private _router: Router, private route: ActivatedRoute, private productService: ProductserviceService){}
  // Getting Current Searched/Selected on Load.
  ngOnInit(): void {
    this.currentRoute = this._router.url.split('?')[0];
    this.currentRoute = this.currentRoute.replace('/','')
    this.route.queryParamMap.subscribe(async params =>{
      this.currentKey = params.keys[0]
      this.currentParams = params['params'][this.currentKey]
      if(Number(this.currentParams)) {
        ( await this.productService.getProductByID(Number(this.currentParams))).subscribe((data:object) => {
          this.currentParams = data['title']
        })
      }
    })
  }
}
