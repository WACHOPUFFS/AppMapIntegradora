import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //variables para el usuario para que se muestre en el side menu
  username: string;
  fullName: string;

  private tips: string[] = [
    //Tips de notificaciones para los usuarios
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
  
  constructor(
    public toastController: ToastController,
    private userService: UserService
  ) {}


  ngOnInit() {
    // Obtener los datos del usuario al inicializar el componente
    this.userService.getUserData().subscribe((userData: any) => {
      if (userData.success) {
        this.username = userData.user.nombreUsuario;
        this.fullName = userData.user.nombreCompleto;
      }
    });
  
    this.scheduleNotifications();
  }

   // Función para mostrar una notificación emergente
  async showNotification(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 6000,
      position: 'bottom',
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


// Función para programar y mostrar notificaciones periódicas
  scheduleNotifications() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.tips.length); // Obtener un índice aleatorio
      const randomTip = this.tips[randomIndex]; // Obtener un consejo aleatorio
      this.showNotification(randomTip);
    }, 60000);
  }



}
