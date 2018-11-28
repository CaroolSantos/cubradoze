import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable, Subscription} from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { NativeAudio } from '@ionic-native/native-audio';
/**
 * Generated class for the RespostaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resposta',
  templateUrl: 'resposta.html',
})
export class RespostaPage {
  numero1: number;
  numero2: number;
  numero3: number;
  myCount = 6;
  timeDaVez:string;
  ticks =0;
  subscription:Subscription;
  resultado:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nativeAudio: NativeAudio) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespostaPage');
    this.timeDaVez = this.navParams.get("timeDaVez");

     let interval = setInterval(() => {
      this.myCount--;
      this.numero1 = this.getRandomInt(1,6);
      this.numero2 = this.getRandomInt(1,6);
      this.numero3 = this.getRandomInt(1,6);

      if (this.myCount == 0) clearInterval(interval);
    }, 200)

    let timer = Observable.timer(2000,1000);
    this.subscription = timer.subscribe(t => this.tickerFunc(t));
    this.nativeAudio.loop("ticking");
  }

  tickerFunc(tick){
    this.ticks = tick
    console.log(this.ticks);
    if(this.ticks == 60){
      console.log('ACABOU O TEMPO');
      this.nativeAudio.stop("ticking");
      this.subscription.unsubscribe();
    }
    
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  conferir(){
    console.log(this.resultado);
  }

}
