import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/report/report';
import { WebPage } from '../pages/web/web';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TutorialPage; 

  pages : PageObj[] = [
    { title: 'Home', component: HomePage, icon: 'contacts' },
    { title: 'iWitness', component: ReportPage, icon: 'paper', index:2 },
    { title: 'Share', component: WebPage, icon: 'mail', index:3 }
  ];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      platform.registerBackButtonAction(() => {
        console.log("Back button pressed");
        }, 100);
    });
  }
}
