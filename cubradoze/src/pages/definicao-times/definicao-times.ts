import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PartidaProvider } from '../../providers/partida/partida';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import { Storage } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';


/**
 * Generated class for the DefinicaoTimesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-definicao-times',
  templateUrl: 'definicao-times.html',
})
export class DefinicaoTimesPage {
  time1:string;
  time2:string;
  loader;

  constructor(public navCtrl: NavController, public navParams: NavParams, public partidaProv: PartidaProvider,
    public conexaoProv: ConexaoProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    private nativeAudio: NativeAudio,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DefinicaoTimesPage');
    this.storage.clear();
  }

  acessarJogo(){
    this.showLoading('Aguarde...');
    console.log('times',this.time1,this.time2)

    this.storage.set("time1",this.time1);
    this.storage.set("time2",this.time2);
    this.nativeAudio.stop("intro");
    if(this.conexaoProv.isOnline()){

      let partida = {
        Time1: this.time1,
        Time2: this.time2
      }
      this.partidaProv.salvar(partida).subscribe(novapartida=>{
        console.log(novapartida);
        this.storage.set("IdPartida",novapartida.Id);
        this.loader.dismiss();
        this.navCtrl.setRoot(HomePage,{offline:false});
      },error=>{
        console.error('erro ao salvar partida na API',error);
        this.loader.dismiss();
        this.navCtrl.setRoot(HomePage,{offline:true});

        // var alert = this.alertCtrl.create({
        //   title: "Ops",
        //   subTitle: "Aconteceu algo errado, tente novamente."
        // });
        // this.nativeAudio.play('error', () => console.log('error is done playing'));
        // alert.present();
      })
    } else{
      this.loader.dismiss();
      this.navCtrl.setRoot(HomePage,{offline:true});
    }
    
    
  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

}
