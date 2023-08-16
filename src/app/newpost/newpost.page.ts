import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.page.html',
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage {

  constructor(public toastController: ToastController) {}

  async presentNotificationToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'notification-toast', // Clase de estilo personalizada para el toast
      
    });

    await toast.present();
  }

  showNotification() {
    const tip = 'Se ha publicado un nuevo post';
    this.presentNotificationToast(tip);
  }
}
