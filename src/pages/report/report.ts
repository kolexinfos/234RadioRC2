import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams, App   } from 'ionic-angular';

import { Toast, ImagePicker, Transfer } from 'ionic-native';

import { HomePage } from '../home/home';

import { MessageProvider } from '../../providers/message-provider/message-provider';
import {Plugins} from '../../providers/plugin.service';


@Component({
    templateUrl: 'report.html'

})

export class ReportPage {


    report: {email?: string, message?: string, phone?: string,title?: string,type?:string, filename?:string} = {};

    uri:string = '';
    title:string = '';

    submit = false;

    constructor(public navParams: NavParams, private navController: NavController,
    private messageProvider: MessageProvider,
    private app: App,
    private loadingCtrl: LoadingController)
    {
       
        this.title = this.navParams.get('type');
        console.log(this.title);
    }

    ionViewDidEnter(){         
        
        this.app.setTitle(this.title);
    }

    FileSelected(){
      let options = {
        // quality of resized image, defaults to 100
        quality: 99,
        maximumImagesCount:1
      };

      ImagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.uri = results[i]
        }
      }, (err) => { });
    }

    onSubmit(form)
    {
         let loadingPopup = this.loadingCtrl.create({
                  content: 'Sending your report...',
                  dismissOnPageChange : true
            });
            
        Toast.show("Please wait sending your report...", "short", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          }
                    );
        console.log("The details in the form is " + form);
        this.submit = true;
        this.upload();
        
        this.report.type = this.title;
        console.log(this.report.filename);
        if(form.valid && this.report.filename != "")
        {  
            loadingPopup.present();

            this.messageProvider.SendReport(this.report).subscribe(
                data => {
                    console.log(data);
                    this.report = {};

                    loadingPopup.dismiss().catch(() => {});
                    this.navController.pop();
                     Toast.show("You report was submitted successfully.", "short", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          }
                    );
                },
                err => {
                    loadingPopup.dismiss().catch(() => {});

                    console.log(err);

                     Toast.show("An Error occurred please try again later", "short", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          }
                    );
                },
                () => {
                    console.log('Finally called on CreateReport');
                   loadingPopup.dismiss().catch(() => {});
                }
                )
        }
        else{
            Toast.show("Please make sure all the fields are filled in and an image is selected", "long", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          });
            
        }
    }

    upload(){
        const fileTransfer = new Transfer();
        var options: any;
        var parts = this.uri.split('/');
        var filename = parts[parts.length - 1];
        console.log(parts.length);
        filename = filename;
        this.report.filename =filename;

        options = {
            fileKey: 'file',
            fileName: filename,
            headers: {}
        }
        fileTransfer.upload(this.uri, "https://shoppa.herokuapp.com/users/upload", options)
        .then((data) => {
            console.log(data)
        }, (err) => {
            // error
            console.log(err);
        })
}



}
