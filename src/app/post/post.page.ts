import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  publicaciones: any[] = []; // Variable para almacenar las publicaciones

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerPublicaciones();
  }

  // Método para obtener las publicaciones desde el servidor
  obtenerPublicaciones() {
    this.http.get('http://localhost:3000/obtenerPublicaciones').subscribe(
      (data: any) => {
        this.publicaciones = data; 

        // Invertir el orden del arreglo para mostrar las más nuevas primero
        this.publicaciones.reverse();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
