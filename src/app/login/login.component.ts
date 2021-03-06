import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators} from './login-form.validators';
import {AuthService} from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any;
  form = new FormGroup({
    account: new FormGroup({
      'phone' : new FormControl('', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern('^[0-9]*$'),
        FormValidators.cannotContainSpace]),
      'password' : new FormControl()
    })
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  get phone() {
    return this.form.get('account.phone');
  }

  login() {
    this.auth.login(this.form.value.account.phone, this.form.value.account.password)
    .subscribe(response => {
      this.loginData = response;
      this.router.navigate(['/products']);
    }, (error: AppError) => {
      if (error.originalError.status === 400) {
        alert('Invalid id or password');
      } else {
        this.router.navigate(['/errorpage']);
      }
      console.log(error.originalError.status);
    });
    // if (!valid) {
    //   this.form.setErrors({
    //     invalidLogin: true;
    //   });
    // }
  }
}
