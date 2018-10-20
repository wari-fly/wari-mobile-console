import { DetailPage } from './../detail/detail';
import { Component, OnInit } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { GlobalProvider } from '../../providers/global.provider';
import { TrackerPage } from '../tracker/tracker';
import { ProfilePage } from '../profile/profile';
import { LocationPage } from '../location/location';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  sites: any[];

  constructor(
    public navCtrl: NavController,
    private dataService: DataService,
    private global: GlobalProvider) { 
     
    }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.global.showLoading();
    this.dataService.tracker().getAll().then((res: any) => {
      this.sites = res;
      this.global.dismissLoading();
    }).catch(err => {
      this.global.showError("Error loaded Wari Proyects");
    });
  }

  details(site: any) {
    this.navCtrl.push(DetailPage, { "site": site });
  }

  finding() {
    this.navCtrl.setRoot(TrackerPage);
  }

  doRefresh(refresher: Refresher) {
    this.dataService.tracker().getAll().then((res: any) => {
      this.sites = res;
      refresher.complete();
    }).catch(err => {
      refresher.complete();
    });
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  location() {
    this.navCtrl.push(LocationPage);
  }
}
