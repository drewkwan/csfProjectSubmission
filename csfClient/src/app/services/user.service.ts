import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { default as decode} from 'jwt-decode';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  decodeUser(token: string) {

    try{
      const decoded: any = decode(token)
      const expirationDate = decoded.exp * 1000;
      if (new Date().getTime()> expirationDate) {
        return null;
      }
      this.storeUser(decoded, token);
      console.log(decoded)
      return decoded;
    } catch (e) {
      console.log(e);
    }

  }

  private storeUser(decoded: User, token: string) {
    localStorage.setItem('userData', JSON.stringify({
      exp: decoded.exp,
      iat: decoded.iat,
      sub: decoded.sub,
      token: token
    }))
  }

  getAllUsers(): Promise<any> {
    return firstValueFrom(this.http.get("/api/getAllUsers"));
  }

  // createUser(username: string, password: string) {
  //   const body = {
  //     username: username,
  //     password: password
  //   }
  //   return lastValueFrom(this.http.post("/api/createUser", body));
  // }

  deleteUser(username: string) {
    const params = new HttpParams()
          .set('username', username)
    // const body ={ 
    //   username: username,
    //   password: password
    // }
    return lastValueFrom(this.http.delete("/api/deleteUser", {params: params}));
  }


}
