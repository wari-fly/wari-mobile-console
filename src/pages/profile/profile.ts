import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  p: any = { lastName: '', firstName: '', displayName: '', email: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataService) {
  }

  ionViewDidLoad() {
    this.dataService.auth().getSession()
      .then(res => {
        this.getInformation(res.email);
      }, error => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getInformation(email: any) {
    this.dataService.auth().getProfile(email)
      .then((res: any) => {
        console.log(res)
        this.p = res;
      }, error => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.dataService.auth().logout()
      .then(res => {
        this.navCtrl.setRoot(LoginPage);
      }, err => { console.log(err); })
      .catch(error => { console.log(error); });
  }
}
