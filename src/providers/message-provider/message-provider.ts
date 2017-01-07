import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Message provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageProvider {

  url:string = 'https://shoppa.herokuapp.com/users/';
  
   headers =  new Headers({'Content' : 'application/json'});
   options = new RequestOptions({ headers : this.headers});
  
  constructor(private http: Http) {}

  SendReport(report){

    let headers =  new Headers({'Content' : 'application/json'});
    let options = new RequestOptions({ headers : headers});

    var response = this.http.post(this.url + 'sendEmail',report, options);
    return response;
  }

}

