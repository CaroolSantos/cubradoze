import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DefinicaoTimesPage } from '../definicao-times/definicao-times';
import { IntroducaoPage } from '../introducao/introducao';
import { Storage } from '@ionic/storage';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import { PartidaProvider } from '../../providers/partida/partida';


@IonicPage()
@Component({
  selector: 'page-tela-vitoria',
  templateUrl: 'tela-vitoria.html',
})
export class TelaVitoriaPage {
  timeVencedor: string;
loader;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, public conexao: ConexaoProvider, 
    public partidaProvider: PartidaProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad TelaVitoriaPage');
    this.timeVencedor = this.navParams.get("timeVencedor");
    
    if (this.conexao.isOnline()) {
      this.showLoading('Salvando partida...');
      this.storage.get("IdPartida").then(IdPartida => {
        this.storage.get("Jogo").then(Jogo => {
          let partida = { IdPartida: IdPartida, Jogo: Jogo, TimeVencedor: this.timeVencedor };

          this.partidaProvider.finalizar(partida)
            .subscribe(() => {
              this.storage.clear();
              this.loader.dismiss();
            }, 
            error => {
              this.loader.dismiss();
            })
        })
      })

    }

  }

  novoJogo() {
    this.storage.clear();
    this.navCtrl.setRoot(DefinicaoTimesPage);
  }

  sair() {
    this.storage.clear();
    this.navCtrl.setRoot(IntroducaoPage);
  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

}
