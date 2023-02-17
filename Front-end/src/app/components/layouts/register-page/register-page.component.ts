import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/services/user/loginservice.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  errorMsg:string = '';
  constructor(private loginService: LoginserviceService, private _router: Router) {}
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]+')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  // Mock Register user
  async register() {
    (await this.loginService.registerRequest(this.registerForm.value)).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.errorMsg = err.error.text,
      complete: () => {alert("Registration Successful!"), this._router.navigate(['login']);}
    })
  }
}
