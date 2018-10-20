import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { DataService } from '../../providers/data/data.service';
import { GlobalProvider } from '../../providers/global.provider';
import { v4 as uuid } from 'uuid';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private global: GlobalProvider) {
  }

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      uid: [uuid(), Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      displayName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
 

  signup() {
    if (!this.form.valid) {
      return;
    }
    this.global.showLoading();
    this.dataService.auth().signUp(this.form.value)
      .then((res: any) => {
        const d = res.user.providerData[0];
        d.key = res.user.uid;
        d.issueDate = new Date().toISOString();
        this.saveSession(d);
        this.saveProfile();
        this.navCtrl.setRoot(MenuPage);
        this.global.dismissLoading();
      },
        error => {
          this.global.showError("Error Accediendo al servidor");
        }).catch(err => {
          this.global.showError("Error Accediendo al servidor");
        });
  }

  saveProfile() {
    this.dataService.auth().createUser(this.form.value)
      .then((res: any) => { },
        error => {
          console.log(error);
        }).catch(err => {
          console.log(err);
        });
  }

  saveSession(data) {
    this.dataService.auth().addSession(data)
      .then(res => { }, err => console.error(err))
      .catch(err => console.error(err));
  }
}
