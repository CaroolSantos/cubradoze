import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RespostaPage } from '../resposta/resposta';

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

  constructor(public navCtrl: NavController) {

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
    this.sorteando = true;

    let interval = setInterval(() => {
      this.myCount--;
      this.numero1 = this.getRandomInt(1,6);
      this.numero2 = this.getRandomInt(1,6);
      this.numero3 = this.getRandomInt(1,6);

      if (this.myCount == 0) clearInterval(interval);
    }, 200)

    this.sorteado = true;
    this.navCtrl.push(RespostaPage, {num1: this.numero1, num2: this.numero2, num3: this.numero3});

    
  }

  responder(){
    //todo abrir modal
  }

}
