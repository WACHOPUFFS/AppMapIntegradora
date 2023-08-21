import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GmapsService } from './../services/gmaps/gmaps.service';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const DEFAULT_LATITUDE = 31.6904; // Coordenada de Ciudad Juárez
const DEFAULT_LONGITUDE = -106.4245; // Coordenada de Ciudad Juárez

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  
  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation,
    private http: HttpClient, // Agrega HttpClient
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;

      let location: any; // Coordenadas de la ubicación por defecto
      try {
        // Obtener la ubicación actual del usuario
        const currentLocation = await this.geolocation.getCurrentPosition();
        location = new googleMaps.LatLng(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
      } catch (error) {
        // En caso de error o si el usuario no permite la geolocalización
        // Utilizar coordenadas de Ciudad Juárez por defecto
        location = new googleMaps.LatLng(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
      }
      // Crear un nuevo mapa
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 12,
      });

      this.renderer.addClass(mapEl, 'visible');
      this.UserMarker(location);
      this.onMapClick();
    } catch (e) {
      console.log(e);
    }
  }

  onMapClick() {
    // Configurar los clics en el mapa
    this.mapClickListener = this.googleMaps.event.addListener(this.map, "click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      this.addMarker(mapsMouseEvent.latLng);
    });
  }

  // Metodo para añadir un marcador
  addMarker(location) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icons/crash-icon.png',
      scaledSize: new googleMaps.Size(50, 50), 
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      draggable: true,
      animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);
    this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
      console.log('markerclick', marker);
      this.checkAndRemoveMarker(marker);
      console.log('markers: ', this.markers);
    });
  }

   // Metodo del marcador del usuario
   UserMarker(location) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icons/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50), 
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      //draggable: true,
      animation: googleMaps.Animation.DROP
    });
  }

  checkAndRemoveMarker(marker) {
    // Verificar y eliminar el marcador
    const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
    console.log('is marker already: ', index);
    if(index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
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

  // Mostrar una notificación de peticion de accidente enviado
  showNotification() {
    const tip = 'Se ha enviado tu ubicacion a los servicios de emergencias. La ayuda llegara pronto';
    this.presentNotificationToast(tip);
  }

    // Mostrar una notificación de peticion de accidente enviado
    showNotificationLocationOFF() {
      const tip = 'No se han permitido los permisos de ubicacion';
      this.presentNotificationToast(tip);
    }


// Metodo para enviar tu coordenada
async sendCoordinate() {
  try {
    const currentLocation = await this.geolocation.getCurrentPosition();

    if (!currentLocation) {
      console.error('No se pudo obtener la ubicación actual.');
      return;
    }

    const latitude = currentLocation.coords.latitude;
    const longitude = currentLocation.coords.longitude;

    const postUrl = 'http://192.168.253.1:5000/api/coordinates';

    const postData = {
      latitude: latitude,
      longitude: longitude
    };

    this.http.post(postUrl, postData).subscribe(
      (response) => {
        console.log('Coordenada enviada exitosamente', response);
        this.showNotification();
      },
      (error) => {
        console.error('Error al enviar la coordenada', error);
        this.showNotificationLocationOFF();
      }
    );
  } catch (error) {
    console.error('Error al obtener la ubicación actual', error);

    if (error && error.code === 1) {
      console.error('No se otorgaron permisos de geolocalización.');
      this.showNotificationLocationOFF();
    }
  }
}

  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if(this.mapClickListener) this.googleMaps.event.removeListener(this.mapClickListener);
    if(this.markerClickListener) this.googleMaps.event.removeListener(this.markerClickListener);
  }

}
