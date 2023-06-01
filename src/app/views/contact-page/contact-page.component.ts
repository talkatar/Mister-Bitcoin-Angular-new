import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription,map } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service'
@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  constructor(private contactService: ContactService) { }
    subscription!: Subscription
    contacts: Contact[] | null = null
    contacts$!: Observable<Contact[]>

    ngOnInit() {
        this.contacts$ = this.contactService.contacts$.pipe(
            map(contacts => contacts.reverse())
          )
        
        // this.subscription = this.contactService.contacts$.subscribe(contacts => {
        //     this.contacts = contacts
        // })
    }

    onRemoveContact(contactId: string) {
        this.contactService.deleteContact(contactId)
            .subscribe({
                error: err => console.log('err:', err)
            })
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe()
    }


}
