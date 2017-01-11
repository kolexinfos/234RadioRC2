import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast, SocialSharing } from 'ionic-native'

import { HomePage } from '../home/home';


/*
  Generated class for the VerifyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'verify.html'
})
export class VerifyPage {

  verify: {code?:number, email?:string }= {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ShareApp();
    }

  ShareApp() {
     this.navCtrl.setRoot(HomePage);
     
    SocialSharing.share("234Radio", "234Radio", "http://www.preptitude.com/shoppa/gtb.jpg").then(() => {
      console.log("Success");
     
    }).catch(() => {
      
      console.log("Error");
      
    });
  }
}
