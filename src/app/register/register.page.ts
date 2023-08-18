import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register', 
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Objeto para almacenar la información del usuario
  usuario = {
    nombreU: '', 
    nombreC: '', 
    correoElectronico: '', 
    contrasena: '',
  };

  
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    
  }

  // Método para registrar al usuario
  registrarUsuario() {
    const data = {
      nombreUsuario: this.usuario.nombreU,
      nombreCompleto: this.usuario.nombreC,
      correo: this.usuario.correoElectronico,
      contraseña: this.usuario.contrasena,
    };

    // Realizar una solicitud HTTP POST al servidor para registrar al usuario
    this.http.post('http://localhost:3000/registrar', data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );

    // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
    this.router.navigate(['/login']);
  }
}
