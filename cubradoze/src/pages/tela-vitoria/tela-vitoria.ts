import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DefinicaoTimesPage } from '../definicao-times/definicao-times';
import { IntroducaoPage } from '../introducao/introducao';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-tela-vitoria',
  templateUrl: 'tela-vitoria.html',
})
export class TelaVitoriaPage {
  timeVencedor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TelaVitoriaPage');
    this.timeVencedor = this.navParams.get("timeVencedor");
    this.timeVencedor= "Antonio";
  }

  novoJogo(){
    this.storage.clear();
    this.navCtrl.setRoot(DefinicaoTimesPage);
  }

  sair(){
    this.navCtrl.setRoot(IntroducaoPage);
  }

}
