import { Injectable } from '@angular/core'
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  of,
  switchMap,
  interval,
  timer,
} from 'rxjs';
// import { StorageService } from './storage.service';
// import { UserService } from './user.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http'
import { ChartData } from '../models/chart-data.model';



@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) {
   }

 
  // private userCoins = this.userService.getUser() ? this.userService.getUser().coins : 100;

   getRate = (): Observable<string> => {
    let url = `https://blockchain.info/tobtc?currency=USD&value=1`;
    return this.http.get<string>(url);
}

 getRateStream(): Observable<string> {
    return timer(0, 60000).pipe(switchMap(this.getRate))
}

// market-price
// transactions-per-second

fetchData(str: string): Observable<ChartData> {
  
  const data = JSON.parse(localStorage.getItem(str) || 'null');
  if (data || data?.length) return of(data)

    const url = `https://api.blockchain.info/charts/${str}?timespan=1months&format=json&cors=true`
    return this.http.get<ChartData>(url).pipe(
      tap((data) => {
          localStorage.setItem(str, JSON.stringify(data))
      }),
      catchError(() =>
      throwError(() => 'Something bad happened; please try again later.')
    )
       )
  }



}

