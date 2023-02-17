import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/user/loginservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private loginService: LoginserviceService, private _router: Router){}
  errorMsg: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  // Sending form data to loginService for auth
  async login() {
    (await this.loginService.loginRequest(this.loginForm.value)).subscribe({
      next: (res) => {
        localStorage.setItem('userData', JSON.stringify(res));
      },
      error: (err) => {this.errorMsg = err.error},
      complete: () => {alert("Login Successful!"), this._router.navigate(['home']).then(() => {
        window.location.reload();
      })},
    }
    )
  }
}

