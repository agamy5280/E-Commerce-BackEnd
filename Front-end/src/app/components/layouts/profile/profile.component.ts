import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/user/loginservice.service';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements DoCheck, OnInit {
  constructor(private userService: UserDataService, private loginService: LoginserviceService, private _router: Router){}
  myUserLocalStorage = JSON.parse(localStorage.getItem('userData') || '{}');
  userInformation: string = this.myUserLocalStorage.data
  submitStatus: boolean = false;
  formOldValues: object = [];
  editProfileForm = new FormGroup({
    firstName: new FormControl(this.userInformation['firstName'], [Validators.pattern('[A-Za-z]+')]),
    lastName: new FormControl(this.userInformation['lastName'], [Validators.pattern('[A-Za-z]+')]),
    password: new FormControl('', [Validators.minLength(8)]),
    mobileNum: new FormControl(this.userInformation['mobileNum'], [Validators.pattern('[0-9]+'), Validators.maxLength(20), Validators.minLength(10)]),
    address1: new FormControl(this.userInformation['address1'], [Validators.minLength(5)]),
    address2: new FormControl(this.userInformation['address2'], [Validators.minLength(5)]),
    country: new FormControl(this.userInformation['country']),
    city: new FormControl(this.userInformation['city'], [Validators.pattern('[A-Za-z]+')]),
    state: new FormControl(this.userInformation['state'], [Validators.pattern('[A-Za-z]+')]),
    zipCode: new FormControl(this.userInformation['zipCode'], [Validators.pattern('[0-9]+'), Validators.maxLength(8)]),
  })
  ngOnInit(): void {
    this.formOldValues = this.editProfileForm.value
  }
  ngDoCheck(): void {
      this.editProfileForm.valueChanges.subscribe(value => {
        if(value !== this.formOldValues){
          this.submitStatus = true;
        }
      })
  }
  async editProfle() {
    if(this.submitStatus) {
      (await this.userService.editProfile(this.editProfileForm.value)).subscribe({
        next: (res) => {alert(res['message'])},
        error: (err) => {console.log(err)},
        complete: async () => {
          (await this.loginService.logoutRequest()).subscribe({
            next: (res) => {
            },
            error: (err) => {alert(err.error.message)},
            complete: () => {
              localStorage.removeItem('userData');
              this._router.navigate(['login'])
            },
          }
          )
        }
      })
    }
  }
}
