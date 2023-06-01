import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required]
    })
  }

  subscription!: Subscription

  ngOnInit(): void {
  }

  handleSubmit(): void {
    const userName = this.loginForm.value.userName;
    if (userName) {
      this.userService.signup(userName);
      this.router.navigateByUrl('/');
    }
  }
}
