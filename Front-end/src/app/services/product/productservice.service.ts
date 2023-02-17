import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http: HttpClient) { }
  // Methods to Retrieve Data from API Upon Request. 
  async getProducts() {
    return this.http.get(`http://127.0.0.1:8000/api/products`)
  }
  async getFeaturedProducts() {
    return this.http.get(`http://127.0.0.1:8000/api/products/featured`)
  }
  async getRecentProducts() {
    return this.http.get(`http://127.0.0.1:8000/api/products/recent`)
  }
  async getProductByID(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/products/`+ id)
  }
  async getProductsBySearch(categoryName: string, brandName: string, keyword: string, sort: string, minPrice: number, maxPrice: number) {
    let params = new HttpParams();
    params = params.append('categoryname', categoryName);
    params = params.append('brandName', brandName);
    params = params.append('keyword', keyword);
    params = params.append('sort', sort);
    params = params.append('min_price', minPrice ? minPrice.toString() : '');
    params = params.append('max_price', maxPrice ? maxPrice.toString() : '');
    return this.http.get<{products: any, sortCount: number}>('http://127.0.0.1:8000/api/products/search', {params});
}
  async getUserReviews() {
    return this.http.get(`${environment.apiUrl}users?limit=5`)
  }
}
