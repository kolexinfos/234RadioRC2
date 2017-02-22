import {Component} from '@angular/core';
import {NavController, LoadingController } from 'ionic-angular';

import { Toast, ImagePicker, Transfer } from 'ionic-native';

import { HomePage } from '../home/home';

import { MessageProvider } from '../../providers/message-provider/message-provider';
import {Plugins} from '../../providers/plugin.service';


@Component({
    templateUrl: 'report.html'

})

export class ReportPage {


    report: {email?: string, message?: string, phone?: string,title?: string,type?:string, fileUrl?:any} = {};

    uri:string = '';

    submit = false;

    constructor(private navController: NavController,
    private messageProvider: MessageProvider,
    private loadingCtrl: LoadingController)
    {

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
        console.log("The details in the form is " + form);
        this.submit = true;
        this.upload();
        
        this.report.type = "report";
        if(form.valid){
            
            let loadingPopup = this.loadingCtrl.create({
                  content: 'Loading data...'
            });

            loadingPopup.present();

            this.messageProvider.SendReport(this.report).subscribe(
                data => {
                    console.log(data);
                    this.report = {};

                    loadingPopup.dismiss();
                    this.navController.pop();
                     Toast.show("You report was submitted successfully.", "short", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          }
                    );
                },
                err => {
                    loadingPopup.dismiss();

                    console.log(err);

                     Toast.show("An Error occurred please try again later", "short", 'bottom').subscribe(
                            toast => {
                            console.log(toast);
                          }
                    );
                },
                () => {
                    console.log('Finally called on CreateReport');
                    loadingPopup.dismiss();
                }
                )
        }
    }

    upload(){
        const fileTransfer = new Transfer();
        var options: any;
        var filename = this.report.email + new Date().getUTCMilliseconds();

        options = {
            fileKey: 'file',
            fileName: filename,
            headers: {}
        }
        fileTransfer.upload(this.uri, "https://shoppa.herokuapp.com/users/", options)
        .then((data) => {
            console.log(data)
        }, (err) => {
            // error
            console.log(err);
        })
}


}
