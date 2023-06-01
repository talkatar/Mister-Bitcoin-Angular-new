import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Move } from '../models/user.model';
import { Contact } from '../models/contact.model';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
  public USER_NAMES_KEY = 'userNames'

  public users = JSON.parse(sessionStorage.getItem(this.USER_NAMES_KEY) || 'null') || []
  private _loggedinUser$ = new BehaviorSubject<User | null>(null)
  public loggedInUser$ = this._loggedinUser$.asObservable()

  constructor() {
    const loggedInUser = this.getLoggedinUserFromStorage()
    if (loggedInUser) {
      this._loggedinUser$.next(loggedInUser)
    }
  }

  public getMoves(): Observable<Move[]> {
    const loggedInUser = this.getLoggedinUser()
    if (loggedInUser) {
      return new Observable<Move[]>(observer => {
        observer.next(loggedInUser.moves)
        observer.complete()
      })
    } else {
      return throwError(() => 'User not logged in')

    }
  }

  public getLoggedinUser(): User | null {
    return this._loggedinUser$.value
  }

  public getEmptyUser() {
    return {
      id: '',
      name: '',
      coins: 100,
      moves: []
    }
  }

  public login(name: string) {
    if (!this.users.includes(name)) {
      return null;
    } else {
      const newUser = new User('101', name, 100, [])
      this._loggedinUser$.next(newUser)
      if (sessionStorage) {
        sessionStorage.setItem(this.STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser))
      }
      return this.loggedInUser$;
    }
  }

  public signup(name: string) {
    this.users.push(name)
    sessionStorage.setItem(this.USER_NAMES_KEY, JSON.stringify(this.users))
    const newUser = new User('101', name, 100, [])
    this._loggedinUser$.next(newUser)
    sessionStorage.setItem(this.STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser))
  }

  public addMove(contact: Contact, amount: number) {
    console.log(contact);
    const loggedInUser = this.getLoggedinUser()

    if (loggedInUser) {
      const updatedUser = { ...loggedInUser }
      updatedUser.coins -= amount

      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      const hours = currentDate.getHours()
      const minutes = currentDate.getMinutes().toString().padStart(2, '0')
      const seconds = currentDate.getSeconds()

      const move = {
        toId: `${contact._id}`,
        to: `${contact.name}`,
        at: (`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`),
        amount,
      }

      if (!Array.isArray(updatedUser.moves)) {
        updatedUser.moves = [];
      }
      updatedUser.moves = [move, ...updatedUser.moves]
      this._loggedinUser$.next(updatedUser);
      sessionStorage.setItem(this.STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(updatedUser))
    }
  }

  private getLoggedinUserFromStorage(): User | null {
    const userString = sessionStorage.getItem('loggedinUser');
    return userString ? JSON.parse(userString) : null;
  }

  public logout() {
    if (sessionStorage) {
      this._loggedinUser$.next(null);
      sessionStorage.removeItem(this.STORAGE_KEY_LOGGEDIN_USER);
    }
  }
  private _handleError(err: HttpErrorResponse) {
    console.log('error in contact service:', err)
    return throwError(() => err)
  }

}

