import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent {
  @Input() contact: any
  @Input() maxCoins!: number
  @Output() onTransferCoins: EventEmitter<any> = new EventEmitter<any>();
  coins: number = 0

  onHandleTransfer(){
 
    this.onTransferCoins.emit(this.coins)
  }
}
