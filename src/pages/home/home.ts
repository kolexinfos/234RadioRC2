import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {InAppBrowser, SocialSharing} from 'ionic-native';

import { WebPage } from '../web/web';
import { ReportPage } from '../report/report';
import { ContactPage } from '../contact/contact';

import {RadioPlayer} from '../../providers/radio-player/radio-player';

declare var window;
/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'home.html'
})
export class HomePage {

mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 5000,
    pager:true
  };

  playState: string




  player:any;
  constructor(player: RadioPlayer, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.player = player;
    this.playState = "pause";
    //this.startPlaying();
    console.log("Constructor called");



  }

  ionViewDidEnter() {
    var audioElement = <HTMLAudioElement>document.getElementById("toggle");

    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading please wait...'
    });

    loadingPopup.present();
    audioElement.addEventListener("playing", function() { loadingPopup.dismiss();  }, true);

  }

  clearBusy(){
    console.log("Playing now....");

    //this.loadingPopup.dismiss();

  }

  Toggle() {

        var audioElement = <HTMLAudioElement>document.getElementById("toggle");

        console.log('Playback was toggled');
        console.log(audioElement);
        if(audioElement.paused)
        {

          audioElement.play();
          this.playState = "pause"
        }
        else
        {
          audioElement.pause();
          this.playState = "play"
        }
    }


  startPlaying() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading please wait...'
    });

    loadingPopup.present();

    this.player.play().then(() => {
      console.log('Playing');
      loadingPopup.dismiss();
    });
  }

  ShareApp() {
  SocialSharing.share("234Radio", "234Radio", "http://www.preptitude.com/shoppa/gtb.jpg").then(() => {
    console.log("Success");
  }).catch(() => {
    console.log("Error");
  });
}

  openWeb(){
    console.log("Web clicked");
    let browser = new InAppBrowser.open('http://234radio.com', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
    console.log(browser);
  }

  gotoReport(){
    console.log("Report clicked");
    this.navCtrl.setRoot(ReportPage);
  }

  onSlideChangeStart(event){
    //console.log(event);
  }

  gotoContact(){
    console.log("Contact clicked");
    this.navCtrl.setRoot(ContactPage);
  }

  gotoPrograms(){
    console.log("Programs Clicked");
    let browser = new InAppBrowser.open('http://234radio.com/programmes/', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  openFacebook(){
    console.log("Open Facbook");
    let browser = new InAppBrowser.open('https://www.facebook.com/234radio', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  openTwitter(){
    console.log("Open Twitter");
    let browser = new InAppBrowser.open('https://twitter.com/my234Radio', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  openInstagram(){
    console.log("Open Instagram");
    let browser = new InAppBrowser.open('http://234radio.com', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  makeCall(passedNumber){
    console.log("MakeCall passedNumber");
    window.location = passedNumber;
  }

}
