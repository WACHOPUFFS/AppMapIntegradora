import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/auth/user.service';

interface LoginResponse {
  success: boolean;
  user: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario = {
    correoElectronico: '',
    contrasena: '',
  };

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {}

  iniciarSesion() {
    console.log('Cargando inicio');
    const data = {
      correo: this.usuario.correoElectronico,
      contraseña: this.usuario.contrasena,
    };

    this.http.post<LoginResponse>('http://localhost:3000/iniciarSesion', data).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          console.log('Inicio de sesión con éxito');
          
          // Almacenar los datos del usuario en el servicio UserService
          this.userService.setUserData(response.user);

          this.router.navigate(['/home']);
        } else {
          console.log('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
