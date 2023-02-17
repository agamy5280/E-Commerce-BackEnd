import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  constructor(private http: HttpClient) { }

  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';

  headers() {
    return {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myLocalStorageUserData.access_token}
  }
  placeOrder(subTotal: number, shipping: number, total: number) {
    const headers = this.headers();
    const params = { 'subtotal': subTotal, 'shipping': shipping, 'total_price': total };
    return this.http.post(`http://127.0.0.1:8000/api/orders/add/` + this.myLocalStorageUserData.data.id, [], {headers: headers, params: params})
  }
}
