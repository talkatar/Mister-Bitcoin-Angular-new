import { Component } from '@angular/core';
import { Chart, LinearScale, BarController, CategoryScale, BarElement } from 'chart.js';
import { Observable, Subscription } from 'rxjs'
import { BitcoinService } from '../../services/bitcoin.service';
import { ChartData } from '../../models/chart-data.model'

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  constructor(private BitcoinService: BitcoinService) { }


  marketPriceStr = 'market-price'
  tradeVolumeStr = 'trade-volume'

  marketPrice$!: Observable<ChartData>
  tradeVolume$!: Observable<ChartData>
  display: string = this.marketPriceStr;


  ngOnInit(): void {
    this.marketPrice$ = this.BitcoinService.fetchData(this.marketPriceStr)
    this.tradeVolume$ = this.BitcoinService.fetchData(this.tradeVolumeStr)
  }
}
