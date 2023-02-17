import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  myLocalStorageUserData = JSON.parse(localStorage.getItem('userData')) || '';
  constructor(private http: HttpClient) { }
  headers() {
    return {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.myLocalStorageUserData.access_token}
  }
  async loginRequest(loginInfo:object) {
   return this.http.post(`http://127.0.0.1:8000/api/user/login`, loginInfo)
  }
  async registerRequest(registerInfo:object) {
    return this.http.post(`http://127.0.0.1:8000/api/user/register`, registerInfo)
   }
   async logoutRequest() {
    return this.http.get(`http://127.0.0.1:8000/api/user/logout/` + this.myLocalStorageUserData.data.id, {headers:this.headers()})
   }
}
