import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  site: any;
  slides = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.site = this.navParams.get("site");
  }

  ionViewDidLoad() {
    this.site.files.forEach(d => {
      this.slides.push({
        title: this.site.nombre,
        description: this.site.descripcion,
        image: d
      });
    });
  }

}
