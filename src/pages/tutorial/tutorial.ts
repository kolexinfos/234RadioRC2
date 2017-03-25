import { Component } from '@angular/core';

import { MenuController, NavController, Platform, LoadingController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';



import {RadioPlayer} from '../../providers/radio-player/radio-player';



interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  player:any;

  constructor(public loadingCtrl: LoadingController, player: RadioPlayer,
  public platform: Platform, public navCtrl: NavController, 
  public menu: MenuController) {
    this.player = player;
    //this.startPlaying();

    this.slides = [
      {
        title: 'Welcome to <b>234Radio</b>',
        description: 'Welcome to 234Radio, your number one international online radio.',
        image: 'img/234radio.jpg',
      },
      {
        title: 'Find <b>234Radio</b> on all social media platforms',
        description: 'Follow us on Twitter: @my234radio, on Instagram @234Radio and search for 234Radio on Facebook',
        image: 'img/234radio.jpg',
      },
      {
        title: 'Be our reporter',
        description: 'Submit iWitness report and get heard.',
        image: 'img/234radio.jpg'
      }
    ];

    this.platform.ready().then(() => {
    console.log("ionViewWillEnter called");
    
    });
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
  startApp() {

    this.navCtrl.setRoot(HomePage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(true);

  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    this.pause();

  }

  pause() {
    this.player.pause();
  }

}
