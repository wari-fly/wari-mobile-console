import { MenuPage } from './../menu/menu';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../providers/data/data.service';
import { GlobalProvider } from '../../providers/global.provider';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private global: GlobalProvider) { }

  ngOnInit() {
    this.initFormBuilder();
  }

  ionViewDidLoad() {
  }

  initFormBuilder() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.global.showLoading();
    this.dataService.auth().signIn(this.loginForm.value)
      .then((res: any) => {
        const d = res.user.providerData[0];
        d.key = res.user.uid;
        d.issueDate = new Date().toISOString();
        this.saveSession(d);
        this.navCtrl.setRoot(MenuPage);
        this.global.dismissLoading();
      }, error => {
        this.global.showError("Access Denied");
      }).catch(err => {
        this.global.showError("Access Denied");
      });
  }

  saveSession(data) {
    this.dataService.auth().addSession(data)
      .then(res => { }, err => console.error(err))
      .catch(err => console.error(err));
  }

  google() {
    if (this.platform.is('android') || this.platform.is("cordova")) {
      this.dataService.auth().nativeGoogleLogin()
        .then(res => {
          const d = res.user.providerData[0];
          this.dataService.auth().createUser(d);
          d.key = res.user.uid;
          d.issueDate = new Date().toISOString();
          this.saveSession(d);
          this.navCtrl.setRoot(MenuPage);
        },
          error => this.global.showMensaje("Access Denied")
        )
        .catch(error => {
          this.global.showMensaje("Access Denied");
        });
    } else
      if (this.platform.is('mobileweb')) {
        this.dataService.auth().webGoogleLogin()
          .then(res => {
            const d = res.user.providerData[0];
            this.dataService.auth().createUser(d);
            d.key = res.user.uid;
            d.issueDate = new Date().toISOString();
            this.saveSession(d);
            this.navCtrl.setRoot(MenuPage);
          },
            error => this.global.showMensaje("Access Denied")
          )
          .catch(error => {
            this.global.showMensaje("Access Denied");
          });
      } else {
        this.global.showMensaje("otra Tecnologia")
      }

  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
