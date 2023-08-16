import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private tips: string[] = [
    'Recuerda siempre usar el cinturón de seguridad.',
    'Respeta los límites de velocidad y las señales de tránsito.',
    'Mantén una distancia segura entre vehículos.',
    'Utiliza las luces adecuadamente, especialmente en condiciones de baja visibilidad.',
    'Evita el uso del teléfono móvil mientras conduces.',
    'No consumas alcohol ni drogas antes de conducir.',
    'Cede el paso a los peatones en los cruces peatonales.',
    'Realiza mantenimientos regulares a tu vehículo para asegurar su funcionamiento adecuado.',
    'No manejes cuando estés cansado o somnoliento.',
    'Mantén tus manos en el volante y evita distracciones al conducir.',
    'Respeta las zonas escolares y las áreas de juegos para niños.',
    'Usa casco y equipo de protección al andar en bicicleta o motocicleta.',
    'No te estaciones en lugares prohibidos o en espacios para discapacitados.',
    'No bloquees las intersecciones y cruces viales.',
    'Usa el cinturón de seguridad en todos los asientos del vehículo.',
  ];
  
  constructor(public toastController: ToastController) {}

  ngOnInit() {
    this.scheduleNotifications();
  }

  async showNotification(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
      position: 'top',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Notificación cerrada');
          }
        }
      ]
    });

    await toast.present();
  }

  scheduleNotifications() {
    let index = 0;

    setInterval(() => {
      const tip = this.tips[index % this.tips.length];
      this.showNotification(tip);
      index++;
    }, 60000); // Muestra la notificación cada 1 minuto (60000 ms)
  }


}
