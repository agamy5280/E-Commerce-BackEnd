import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) { }

  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  headers() {
    return {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myLocalStorageUserData.access_token}
  }
  async editProfile(editform: Object) {
    return this.http.patch(`http://127.0.0.1:8000/api/user/edit/` + this.myLocalStorageUserData.data.id, editform, {headers:this.headers()})
   }
   async getOrders() {
    return this.http.get(`http://127.0.0.1:8000/api/orders/display/` + this.myLocalStorageUserData.data.id, {headers:this.headers()})
   }
   async getOrderProducts(orderID: number) {
    const params = {'orderID': orderID }
    return this.http.get(`http://127.0.0.1:8000/api/orders/displayOrdersProducts/` + this.myLocalStorageUserData.data.id, {params:params, headers:this.headers()})
   }
}
