import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

    apiUrl = "http://localhost:3000";

    login(name: string, password: string) {
      return this.httpClient.post<LoginResponse>("/login", {name, password}).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        })
      );
    }

    signup(name: string, email: string, password: string){
      return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
        tap((value) => {
          sessionStorage.setItem("auth-token", value.token)
          sessionStorage.setItem("username", value.name)
        })
      )
    }

}
