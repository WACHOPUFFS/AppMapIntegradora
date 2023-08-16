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

  obtenerPublicaciones() {
    this.http.get('http://localhost:3000/obtenerPublicaciones').subscribe(
      (data: any) => {
        this.publicaciones = data; // Asignar los datos obtenidos a la variable
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
