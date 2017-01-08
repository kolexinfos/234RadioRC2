import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/report/report';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { VerifyPage } from '../pages/verify/verify';

import { RadioPlayer } from '../providers/radio-player/radio-player';
import { MessageProvider } from '../providers/message-provider/message-provider';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    ReportPage,
    TutorialPage,
    VerifyPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    ReportPage,
    TutorialPage,
    VerifyPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},RadioPlayer, MessageProvider]
})
export class AppModule {}
