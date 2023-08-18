import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newpost', 
  templateUrl: './newpost.page.html', 
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage implements OnInit {

  // Objeto para almacenar la información de la publicación
  publicacion = {
    tituloP: '',
    subtituloP: '', 
    descripcionP: '', 
    fechaP: '', 
    imagenP: null, 
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // Mostrar un mensaje emergente de notificación
  async presentNotificationToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'notification-toast',
    });

    await toast.present();
  }

  // Mostrar una notificación de nueva publicación
  showNotification() {
    const tip = 'Se ha publicado un nuevo post';
    this.presentNotificationToast(tip);
  }

  // Manejar la selección de un archivo de imagen
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.publicacion.imagenP = file;
    }
  }

  // Método para publicar una nueva publicación
  publicar() {
    const formData = new FormData();
    formData.append('titulopublicacion', this.publicacion.tituloP);
    formData.append('subtitulopublicacion', this.publicacion.subtituloP);
    formData.append('descripcionpublicacion', this.publicacion.descripcionP);
    formData.append('fechapublicacion', this.publicacion.fechaP);
    formData.append('imagen', this.publicacion.imagenP);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      }),
    };

    // Realizar una solicitud HTTP POST para publicar la nueva publicación
    this.http.post('http://localhost:3000/publicar', formData, httpOptions).subscribe(
      (response) => {
        console.log(response);

        this.showNotification();
        this.router.navigate(['/post']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
