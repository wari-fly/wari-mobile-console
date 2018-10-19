import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TrackerPage } from '../tracker/tracker';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Wari', component: HomePage, icon: "home" },
      { title: 'Ubicar', component: TrackerPage, icon: "locate" }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
