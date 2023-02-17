import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {

  constructor(private http: HttpClient) { }

  // Getting Categories from API
  getCategories() {
    return this.http.get(`http://127.0.0.1:8000/api/categories`)
  }
}
