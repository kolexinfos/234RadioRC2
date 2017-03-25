import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/report/report';
import { VerifyPage } from '../pages/verify/verify';

import {InAppBrowser, SocialSharing, Device} from 'ionic-native';

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

  @ViewChild('Nav') nav: NavController;

  pages : PageObj[] = [
    { title: 'Home', component: HomePage, icon: 'contacts' },
    { title: 'iWitness', component: ReportPage, icon: 'paper', index:2 },
    { title: 'Share', component: VerifyPage, icon: 'share', index:3 },
    { title: 'Contact Us', component: ReportPage, icon: 'mail', index:4 },
    { title: 'Twitter', component: VerifyPage, icon: 'logo-twitter', index:5 },
    { title: 'Facebook', component: VerifyPage, icon: 'logo-facebook', index:6 },
    { title: 'Website', component: VerifyPage, icon: 'link', index:7 },
   // { title: 'Call Us', component: VerifyPage, icon: 'mail', index:3 }
  ];

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      platform.registerBackButtonAction(() => {
        console.log("Back button pressed");
        
        if(this.nav.canGoBack()){
           this.nav.pop();
         }
        else
        {
          navigator['app'].exitApp();  
        }
        
        }, 100);
    });
  }

  openFacebook(){
    console.log("Open Facbook");
    let browser = new InAppBrowser('https://www.facebook.com/234radio', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  openTwitter(){
    console.log("Open Twitter");
    let browser = new InAppBrowser('https://twitter.com/my234Radio', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

  openInstagram(){
    console.log("Open Instagram");
    let browser = new InAppBrowser('http://234radio.com', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
  }

   openWeb(){
    console.log("Web clicked");
    let browser = new InAppBrowser('http://234radio.com', '_blank', "EnableViewPortScale=yes,location=no" );
    browser.show();
    console.log(browser);
  }

  // makeCall(passedNumber){
  //   console.log("MakeCall passedNumber");
  //   window.location = passedNumber;
  // }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      if(page.index == 5)
      {
        this.openTwitter();
      }
      else if(page.index == 6){
        this.openFacebook();
      }
      else if (page.index == 7){
        this.openWeb();
      }
      else{
        this.nav.push(page.component, {tabIndex: page.index});
      }

    } else {
      this.nav.setRoot(page.component);
    }
  }
}
