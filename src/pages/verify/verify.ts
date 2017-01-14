import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast, SocialSharing, Device } from 'ionic-native'

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
     let image = "";

     console.log(Device.platform);
     if(Device.platform == "Android"){
       image = "http://234radio.com/wp-content/uploads/2016/06/Download-App-on-Android.png";
     }
     else{
       image = "http://234radio.com/wp-content/uploads/2016/06/Available-on-the-App-Store.png"
     }
     
    SocialSharing.share("234Radio", "234Radio", image).then(() => {
      console.log("Success");
     
    }).catch(() => {
      
      console.log("Error");
      
    });
  }
}
