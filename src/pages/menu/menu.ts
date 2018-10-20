import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TrackerPage } from '../tracker/tracker';
import { DataService } from '../../providers/data/data.service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) {
    this.pages = [
      { title: 'Wari', component: HomePage, icon: "home" },
      { title: 'Ubicar', component: TrackerPage, icon: "locate" }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.dataService.auth().logout()
      .then(res => {
        this.navCtrl.setRoot(LoginPage);
      }, err => { console.log(err); })
      .catch(error => { console.log(error); });
  }
}
