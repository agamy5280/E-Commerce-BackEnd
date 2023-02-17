import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-product-stars',
  templateUrl: './product-stars.component.html',
  styleUrls: ['./product-stars.component.scss']
})
export class ProductStarsComponent implements OnInit {
  // Receiving product ID from Parent.
  @Input() rating: number = 0 ;
  productRatingFloor: number = 0 ;
  productRatingRemaning: number = 0 ;
  productRatingEmptyStart: number = 0;
  constructor(){}
  // Getting Number of Stars for the chosen rating.
  ngOnInit() {
    this.productRatingFloor = Math.floor(this.rating);
    this.productRatingRemaning = 5 -  Math.floor(this.rating);
    this.productRatingEmptyStart = 5 - Math.ceil(this.rating);
  }
}
