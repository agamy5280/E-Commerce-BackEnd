import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  myUserLocalStorage = JSON.parse(localStorage.getItem('userData') || '{}');
  userInformation: string = this.myUserLocalStorage.data
  constructor() {}
}
