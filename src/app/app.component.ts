import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { DataService } from '../providers/data/data.service';
import { MenuPage } from '../pages/menu/menu';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private dataService: DataService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadPage();
    });
  }

  loadPage() {
    this.dataService.auth().getSession()
      .then(user => {
        if (user) {
          const d = user.providerData[0];
          d.key = user.uid;
          d.issueDate = new Date().toISOString();
          this.saveSession(d);
          this.rootPage = MenuPage;
        } else {
          this.rootPage = LoginPage;
        }
      }, err => {
        console.log(err);
        this.rootPage = LoginPage;
      })
      .catch(err => {
        console.log(err);
        this.rootPage = LoginPage;
      });
  }
  saveSession(data) {
    this.dataService.auth().addSession(data)
      .then(res => { }, err => console.error(err))
      .catch(err => console.error(err));
  }
}
