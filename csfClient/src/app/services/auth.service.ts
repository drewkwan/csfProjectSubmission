import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { User, UserData, LoginData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  loadUser!: User;
  userChange = new BehaviorSubject<User|null>(null);
  

  register(data: UserData) {
    const body = {
      username: data.username,
      password: data.password,
    }
    return lastValueFrom(this.http.post("http://localhost:8080/api/registerUser", body))
  }

  login(data: LoginData): Promise<any> {
    const body = {
      username: data.username,
      password: data.password
    }

    return lastValueFrom(this.http.post("http://localhost:8080/api/login", body))
  }

}
