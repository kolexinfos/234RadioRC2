import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RadioPlayer provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RadioPlayer {
  url:string;
  stream:any;
  promise:any;
  playing:boolean = false;

  constructor() {
    this.url = "http://streaming.radio.co/s7f3695a64/listen";
      //"http://streaming.radio.co/s7f3695a64/low"

      //"http://streaming.radio.co/s7f3695a64/listen";
    this.stream = new Audio(this.url);
  };

  play() {
    if(this.playing != true){
    this.stream.play();
      this.playing = true;

    this.promise = new Promise((resolve,reject) => {
      this.stream.addEventListener('playing', () => {
        resolve(true);
      });

      this.stream.addEventListener('error', () => {
        reject(false);
      });
    });

    return this.promise;
    }

  };

  pause() {
    if(this.playing == true) {
      this.stream.pause();
      this.playing = false;
    }

  };

}


