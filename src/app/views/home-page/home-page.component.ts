import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription, map } from 'rxjs';
import { User, Move } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private BitcoinService: BitcoinService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required]
    })
  }

  loggedInUser: User | null = null
  moves: Move[] = []
  rate$!: Observable<string>


  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedinUser()
    this.rate$ = this.BitcoinService.getRateStream()
    this.getFilteredMovesObservable(this.loggedInUser?.name)
  }

  onLogIn() {
    const userName = this.loginForm.value.userName
    const loggedInUser = this.userService.login(userName)
    if (!loggedInUser && userName) {
      this.router.navigateByUrl('/signup');
    }
    else {
      this.loggedInUser = this.userService.getLoggedinUser()
    }

  }

  onLogOut() {
    this.userService.logout()
    this.loggedInUser = this.userService.getLoggedinUser()
  }

  getFilteredMovesObservable(userName: string | undefined): void {
    this.userService.getMoves().pipe(
      map(moves => moves.slice(0, 3))
    ).subscribe(moves => {
      this.moves = moves;
    })
  }
}
