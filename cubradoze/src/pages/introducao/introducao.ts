import { DefinicaoTimesPage } from './../definicao-times/definicao-times';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntroducaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html',
})
export class IntroducaoPage {
  falaProfessor: string = "Olá, estou aqui para te ajudar a se divertir enquanto treina seus conhecimentos com as operações básicas e suas combinações!"
  mudarOrdem: boolean = false;
  falaProfessor2: string;
  selecionarTimes: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroducaoPage');
  }

  passarFala() {
    this.mudarOrdem = true;
    this.falaProfessor = "Você vai precisar realizar operações matemáticas com os valores que irão ser sorteados. Exemplo: 2+2=4 ou 2x3+1=7.";
    this.falaProfessor2 = "Ao realizar as operações é só responder qual número você quer preencher no tabuleiro. Mas é tudo de cabeça tá? Ganha o jogo o time que conseguir preencher o seu tabuleiro mais rápido!"

  }

  selecionarTime() {
    this.navCtrl.push(DefinicaoTimesPage);

  }


}
