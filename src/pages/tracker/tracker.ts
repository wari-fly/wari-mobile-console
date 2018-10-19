import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DataService } from '../../providers/data/data.service';
import { GlobalProvider } from '../../providers/global.provider';
import { DetailPage } from '../detail/detail';
import { Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-tracker',
  templateUrl: 'tracker.html',
})
export class TrackerPage implements OnInit {

  sites: any[];
  positionSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private dataService: DataService,
    private global: GlobalProvider,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.startTracking();
  }

  loadData() {
    this.geolocation.getCurrentPosition().then(pos => {
      //this.global.showLoading();
      this.dataService.tracker().getTraking(pos.coords.latitude, pos.coords.longitude).then((res: any) => {
        this.sites = res;
        //this.global.dismissLoading();
      }).catch(err => {
        //this.global.showError("Error loaded Wari Proyects");
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLeave() {
    this.stopTracking();
  }

  startTracking() {
    this.positionSubscription = this.geolocation.watchPosition()
      .subscribe((pos: any) => {
        //this.global.showLoading();
        this.dataService.tracker().getTraking(pos.coords.latitude, pos.coords.longitude).then((res: any) => {
          this.sites = res;
          //this.global.dismissLoading();
        }).catch(err => {
          //this.global.showError("Error loaded Wari Proyects");
        });
      });
  }

  stopTracking() {
    this.positionSubscription.unsubscribe();
  }

  details(site: any) {
    this.navCtrl.push(DetailPage, { "site": site });
  }


}
