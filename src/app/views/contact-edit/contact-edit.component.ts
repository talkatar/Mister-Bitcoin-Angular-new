import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap, tap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  contact = this.contactService.getEmptyContact() as Contact
  subscription!: Subscription

  ngOnInit(): void {
    console.log('this.contact', this.contact);

    this.subscription = this.route.data
      .pipe(
        map(data => data['contact']),
        filter(contact => contact)
      )
      .subscribe(contact => this.contact = contact)
  }


  onSaveContact() {
    console.log('this.contact', this.contact);

    this.contactService.saveContact(this.contact)
      .subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: err => console.log('err:', err)
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}