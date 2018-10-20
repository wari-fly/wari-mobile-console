import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapRef: ElementRef;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public geolocation: Geolocation
    ) {
  }

  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    }).catch(error => {
      this.alertCtrl.create({
        title: 'Message',
        subTitle: 'Imposible acceder a la localizacion!',
        buttons: ['Aceptar']
      }).present();
    })
  }
  loadMap(position: Geoposition) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const location = new google.maps.LatLng(latitude, longitude);
    const options = {
      center: location,
      zoom: 15
    };
    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, map);
  }
  
  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }
}
