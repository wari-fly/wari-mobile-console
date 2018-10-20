import { MenuPage } from './../menu/menu';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    this.global.showMensaje("Pronto estara disponible");
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
