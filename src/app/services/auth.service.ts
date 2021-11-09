import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import {shareReplay } from 'rxjs/operators';
import * as moment from 'moment';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) {
  }

  //Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/login`, user)
    .do(res => this.setSession(res.userName, res.userId, res.idToken, res.expireIn))
    // .do(res => console.log(JSON.stringify(res)))
    // .pipe(shareReplay());
  }

  //Sign-up
  signUp(user: User) {
    return this.http.post<any>(`${this.endpoint}/signup`, user)
    .do(res => this.setSession(res.userName, res.userId, res.idToken, res.expireIn))
    .pipe(shareReplay());
  }

  private setSession(userName: string, userId: string, idToken: string, expireIn: moment.DurationInputArg1) {
    const expireAt = moment().add(expireIn, 'second');
    localStorage.setItem('user_name', userName);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem("expires_at", JSON.stringify(expireAt.valueOf()))
    for(var i in localStorage) {
      console.log(i + ' = ' + localStorage[i]);
    }
  }

  logOut() {
    localStorage.removeItem('cart_id');
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at") as string;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

