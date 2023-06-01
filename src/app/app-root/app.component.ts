import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import {ChartData} from '../models/chart-data.model'
import { Observable, Subscription,of  } from 'rxjs';
import { BitcoinService } from '../services/bitcoin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent implements OnInit {
  constructor(
      private contactService: ContactService,
      private BitcoinService: BitcoinService
  ) { }
  marketPriceStr = 'market-price'
  tradeVolumeStr = 'trade-volume'

  ngOnInit(): void {
    this.contactService.loadContacts().subscribe({
    })
    this.BitcoinService.fetchData(this.marketPriceStr).subscribe({
      error: (err) => console.log('err', err),
    })
    this.BitcoinService.fetchData(this.tradeVolumeStr).subscribe({
      error: (err) => console.log('err', err),
    })
}
 
}
