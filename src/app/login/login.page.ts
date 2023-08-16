import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
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

  constructor(private router: Router, private http: HttpClient) {}

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
          console.log('Inicio de sesión con exito');
          this.router.navigate(['/home']);
        } else {
          console.log('Usuario o contraseña incorrectas');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
