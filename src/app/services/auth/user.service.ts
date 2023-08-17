import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  private userData: any = null;

  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get<any>(`${this.baseUrl}/user-data`);
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

  getUser() {
    return this.userData;
  }
}
