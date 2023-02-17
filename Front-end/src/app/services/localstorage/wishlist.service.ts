import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  isLoading = false;
  quantity: number;

  headers() {
    return {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myLocalStorageUserData.access_token}
  }

  addProductToWishlist(productID: number) {
    const body = {'productID': productID};
    const headers = this.headers();
    if (this.quantity){
      this.quantity++;
    }
    return this.http.post(`http://127.0.0.1:8000/api/wishlist/add/`+ this.myLocalStorageUserData.data.id, body, {headers: headers})
  }

  getProductsFromWishlist() {
    const headers = this.headers();
    return this.http.get(`http://127.0.0.1:8000/api/wishlist/display/`+ this.myLocalStorageUserData.data.id, {headers: headers})
  }

  getQuantity(): number {
    if (!this.quantity && !this.isLoading) {
      this.isLoading = true;
      const headers = this.headers();
      this.http.get(`http://127.0.0.1:8000/api/wishlist/display/`+ this.myLocalStorageUserData.data.id, {headers: headers})
        .subscribe((data) => {
          this.quantity = data['count'];
          this.isLoading = false;
      });
  }
    return this.quantity;
  }

  // Remove Item on click
  removeItem(productID: number) {
    const headers = this.headers();
    const params = { 'productID': productID };
    this.http.delete(`http://127.0.0.1:8000/api/wishlist/delete/` + this.myLocalStorageUserData.data.id + `/product`, {headers: headers, params: params})
      .subscribe({
        next: (res) => {console.log(res)},
        error: (err) => {alert(err.error['message'])},
        complete: () => {window.location.reload()}
      })
    }
    
  getPriceAfterDiscount(price:number, discount:number) {
    return price - (price * (discount/100))
  }
}
