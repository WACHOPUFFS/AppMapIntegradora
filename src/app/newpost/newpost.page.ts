import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Asegúrate de importar ToastController

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.page.html',
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage implements OnInit {

  publicacion = {
    tituloP: '',
    subtituloP: '',
    descripcionP: '',
    fechaP: '',
    //imagen: null,
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController // Agrega el servicio ToastController aquí
  ) { }

  ngOnInit() {
  }

  async presentNotificationToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'notification-toast',
    });

    await toast.present();
  }

  showNotification() {
    const tip = 'Se ha publicado un nuevo post';
    this.presentNotificationToast(tip);
  }

  publicar() {
    const data = {
      titulopublicacion: this.publicacion.tituloP,
      subtitulopublicacion: this.publicacion.subtituloP,
      descripcionpublicacion: this.publicacion.descripcionP,
      fechapublicacion: this.publicacion.fechaP,
      //formData.append('imagen', this.publicacion.imagen)
    }

    this.http.post('http://localhost:3000/publicar', data).subscribe(
      (response) => {
        console.log(response);
        
        // Ejecutar la notificación al finalizar la publicación
        this.showNotification();
        
        // Redirigir a la página deseada después de publicar
        this.router.navigate(['/post']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

   //handleFileInput(files: FileList) {
    // Manejar la selección de archivos
    //this.publicacion.imagen = files.item(0);
  //}
}
