import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController } from 'ionic-angular';

@Injectable()

export class GlobalProvider {

  loading: Loading;
  
  constructor( private loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  showError(text) {

    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }

  showMensaje(text) {
    let alert = this.alertCtrl.create({
      title: 'Mensaje',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}