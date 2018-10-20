import { DetailPageModule } from './../pages/detail/detail.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config/credentials';

import { DataService } from '../providers/data/data.service';
import { AuthService } from '../providers/data/auth.service';
import { TrackerService } from '../providers/data/tracker.service';

import { GlobalProvider } from '../providers/global.provider';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { TrackerPageModule } from '../pages/tracker/tracker.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { LocationPageModule } from '../pages/location/location.module';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    LoginPageModule,
    SignupPageModule,
    MenuPageModule,
    DetailPageModule,
    TrackerPageModule,
    ProfilePageModule,
    LocationPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    Geolocation,
    DataService,
    AuthService,
    TrackerService,
    GlobalProvider
  ]
})
export class AppModule { }
