import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userData: any = null; // Variable para almacenar los datos del usuario

  constructor(private http: HttpClient) {}

  // Método para obtener los datos del usuario desde el servidor
  getUserData() {
    return this.http.get<any>(`http://localhost:3000/user-data`);
  }

  // Método para almacenar los datos del usuario en la variable userData
  setUserData(userData: any) {
    this.userData = userData;
  }

}
