import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario = {
    nombreU: '',
    nombreC: '',
    correoElectronico: '',
    contrasena: '',
    confirmarContrasena: '', // Nuevo campo para confirmar la contraseña
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
  }

  camposCompletos(): boolean {
    return (
      this.usuario.nombreU &&
      this.usuario.nombreC && 
      this.usuario.correoElectronico &&
      this.usuario.correoElectronico.includes('@') &&
      this.usuario.contrasena &&
      this.usuario.confirmarContrasena === this.usuario.contrasena // Verificar confirmación de contraseña
    );
  }

  registrarUsuario() {
    if (this.camposCompletos()) {
      const data = {
        nombreUsuario: this.usuario.nombreU,
        nombreCompleto: this.usuario.nombreC,
        correo: this.usuario.correoElectronico,
        contraseña: this.usuario.contrasena,
      };

      this.http.post('http://localhost:3000/registrar', data).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );

      this.router.navigate(['/login']);
    } else {
      console.log('Por favor complete todos los campos obligatorios y verifique el correo electrónico y la contraseña.');
    }
  }
}
