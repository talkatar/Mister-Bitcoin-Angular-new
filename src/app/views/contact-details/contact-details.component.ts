import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Observable, lastValueFrom, map, switchMap, tap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User, Move } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContactDetailsComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef

  ) { }

  loggedInUser: User | null = null;
  contact: Contact | null = null
  contact$!: Observable<Contact>
  moves: Move[] = [];

  ngOnInit(): void {
    this.contact$ = this.route.data.pipe(map(data => data['contact']))
    this.loggedInUser = this.userService.getLoggedinUser();
    this.contact$.subscribe((contact: Contact) => {
    this.contact = contact })
    this.getFilteredMovesObservable(this.contact?.name)
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  onTransferCoins(coins: number): void {
    if (!coins) return
    if (this.contact) {
      this.userService.addMove(this.contact, coins)
      this.getFilteredMovesObservable(this.contact.name)
    }
  }

  getFilteredMovesObservable(contactName: string | undefined) {
    this.userService.getMoves().pipe(
      map(moves => moves.filter(move => move.to === contactName).slice(0, 3))
    ).subscribe(moves => {
      this.moves = moves
    });
  }
}
