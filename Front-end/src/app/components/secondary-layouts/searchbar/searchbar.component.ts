import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  searchedKeyword: string = '';
constructor(private _router: Router, private route: ActivatedRoute) {
  // Resetting Params if there's no Searched Product.
  route.queryParams.subscribe(params => {
    if(!params['search']){
      this.searchedKeyword = '';
    }
  })
}
 // Changing Params according to User's Search.
onSearchTextChanged(){
  if(this.searchedKeyword){
    this._router.navigate(['shop'], {
      queryParams: {
        search: this.searchedKeyword
      }
    })
  }else {
    this._router.navigate(['shop']);
  }
}
}
