import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RespostaPage } from '../resposta/resposta';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myCount = 6;
  sorteando = false;
  sorteado = false;
  numero1: number;
  numero2: number;
  numero3: number;
  time1:string;
  time2:string;
  idPartida:number;
  offline:boolean;
  timeDaVez:string;
  time1Numeros:number[] = [];
  time2Numeros:number[] = [1];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
    
      this.storage.get("time1").then(time1=>{
      this.time1 = time1;
    })
    
    this.storage.get("time2").then(time2=>{
      this.time2 = time2;
    })
    
    this.offline = this.navParams.get("offline");

    if(!this.offline){
      this.storage.get("IdPartida").then(idPartida=>{
        if(idPartida){
          this.idPartida = idPartida;
        }
      })
  
    }

    this.timeDaVez = this.getRandomInt(1,2);


   
    
  }
 
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  sortear() {
    // this.sorteando = true;

    // let interval = setInterval(() => {
    //   this.myCount--;
    //   this.numero1 = this.getRandomInt(1,6);
    //   this.numero2 = this.getRandomInt(1,6);
    //   this.numero3 = this.getRandomInt(1,6);

    //   if (this.myCount == 0) clearInterval(interval);
    // }, 200)

    // this.sorteado = true;
    this.navCtrl.push(RespostaPage, {timeDaVez: this.timeDaVez, time1Numeros: this.time1Numeros, time2Numeros: this.time2Numeros, callback: this.myCallbackFunction});
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log('params: ' + JSON.stringify(_params));
      
      resolve();
    });
  }

  time2marcou(numero){
    return this.time2Numeros.indexOf(numero) > -1;
  }

  time1marcou(numero){
    return this.time1Numeros.indexOf(numero) > -1;
  }

}
