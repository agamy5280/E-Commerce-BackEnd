import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageserviceService  {

  constructor(private http: HttpClient) { }
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  cartProducts: string[] = [];
  isLoading = false;
  quantity: number;

  headers() {
    return {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myLocalStorageUserData.access_token}
  }
  getProductsFromCart() {
    const headers = this.headers();
    return this.http.get(`http://127.0.0.1:8000/api/cart/display/`+ this.myLocalStorageUserData.data.id, {headers: headers})
  }

  addProductToCart(productID: number) {
    const body = {'productID': productID};
    const headers = this.headers();
    if (this.quantity){
      this.quantity++;
    }
    return this.http.post(`http://127.0.0.1:8000/api/cart/add/`+ this.myLocalStorageUserData.data.id, body, {headers: headers})
  }

  // Return length of cartProducts.
  getQuantity(): number {
    if (!this.quantity && !this.isLoading) {
      this.isLoading = true;
      const headers = this.headers();
      this.http.get(`http://127.0.0.1:8000/api/cart/display/`+ this.myLocalStorageUserData.data.id, {headers: headers})
        .subscribe((data) => {
          this.quantity = data['count'];
          this.isLoading = false;
      });
  }
    return this.quantity;
  }
  // Decrease Quantity of a selected product on click
  decQuantity(productID: number) {
    const headers = this.headers();
    const params = { 'productID': productID, 'actionQuantity': 'dec' };
    this.http.put(`http://127.0.0.1:8000/api/cart/edit/` + this.myLocalStorageUserData.data.id + `/product`, [], {headers: headers, params: params})
      .subscribe({
        next: (res) => {console.log(res)},
        error: (err) => {alert(err.error['message'])},
        complete: () => {window.location.reload()}
      })
    }
  // Increase Quantity of a selected product on click
  incQuantity(productID: number) {
    const headers = this.headers();
    const params = { 'productID': productID, 'actionQuantity': 'inc' };
    this.http.put(`http://127.0.0.1:8000/api/cart/edit/` + this.myLocalStorageUserData.data.id + `/product`, [], {headers: headers, params: params})
      .subscribe({
        next: (res) => {console.log(res)},
        error: (err) => {alert(err.error['message'])},
        complete: () => {window.location.reload()}
      })
    }
  // Remove Item on click
  removeItem(productID: number) {
    const headers = this.headers();
    const params = { 'productID': productID };
    this.http.delete(`http://127.0.0.1:8000/api/cart/delete/` + this.myLocalStorageUserData.data.id + `/product`, {headers: headers, params: params})
      .subscribe({
        next: (res) => {console.log(res)},
        error: (err) => {alert(err.error['message'])},
        complete: () => {window.location.reload()}
      })
    }
    // Getting subTotal of cart
    getSubTotal(): number {
      let subTotal: number = 0;
      this.cartProducts.forEach((n) => {
        subTotal = subTotal + (n['price'] - (n['price'] * (n['discountPercentage'] / 100))) * n['quantity']
      })
      return subTotal
  }

  // Getting Total of cart
  getTotal(): number {
    let subTotal: number = this.getSubTotal()
    let shipping: number = this.cartProducts.length * 10
    let total: number = subTotal + shipping
    return total
  }
}
