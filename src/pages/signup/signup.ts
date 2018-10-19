import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { DataService } from '../../providers/data/data.service';
import { GlobalProvider } from '../../providers/global.provider';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private global: GlobalProvider) {
  }

  ngOnInit() {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }  

  signup() {
    if (!this.form.valid) {
      return;
    }
    this.global.showLoading();
    this.dataService.auth().signUp(this.form.value)
      .then(() => { this.navCtrl.setRoot(MenuPage); },
        error => this.global.showError("Access Denied"));   
  }
}
