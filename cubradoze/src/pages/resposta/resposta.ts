import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Observable, Subscription} from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { NativeAudio } from '@ionic-native/native-audio';
import { ConexaoProvider } from '../../providers/conexao/conexao';
import { JogadaProvider } from '../../providers/jogada/jogada';
import { Storage } from '@ionic/storage';
import { RespostaErradaPage } from '../resposta-errada/resposta-errada';
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
  number1:number;
  number2:number;
  number3:number;
  operacao1:string;
  operacao2:string;
  time1Numeros:number[] = [];
  time2Numeros:number[] = [1];
  callback: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nativeAudio: NativeAudio, public alertCtrl: AlertController,
    public conexaoProv: ConexaoProvider,
    public jogadaProv: JogadaProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RespostaPage');
    this.timeDaVez = this.navParams.get("timeDaVez");
    this.time1Numeros = this.navParams.get("time1Numeros");
    this.time2Numeros = this.navParams.get("time2Numeros");
    this.callback = this.navParams.get("callback");

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
      this.nativeAudio.play("error");
      
      this.nativeAudio.stop("ticking");
      this.subscription.unsubscribe();

      let alert = this.alertCtrl.create({
        title: "Tempo esgotado!",
        subTitle: "Seu tempo de resposta esgotou :( tente na próxima vez.",
        buttons: [
          {
            text: "Ok",
            handler: data => {
              this.callback(-1).then(() => { 
                this.navCtrl.pop();
              });
            }
          }
      
        ]
      });
      alert.present();

      
    }
    
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  conferir(){
    console.log(this.resultado);
    
    console.log(this.number1);
    console.log(this.operacao1);
    console.log(this.number2);
    console.log(this.operacao2);
    console.log(this.number3);

    var resultado1 = this.calcula(this.number1,this.operacao1,this.number2);
    var resultado2 = this.calcula(resultado1,this.operacao2,this.number3);

    this.subscription.unsubscribe();
    this.nativeAudio.stop("ticking");
    

    if((this.operacao1== "+" || this.operacao1=="-") && (this.operacao2== "*" || this.operacao2=="/")){
      this.nativeAudio.play("error");
      //this.navCtrl.push(RespostaErradaPage);
      let alert = this.alertCtrl.create({
        title: "Se liga na ordem das operações!",
        subTitle: "Não é correto utilizar as operações de soma ou subtração ANTES das operações de multiplicação ou divisão.",
        buttons: ["Tentar novamente"]
      });
      alert.present();
    } else{

      if(resultado2 == this.resultado){
        this.nativeAudio.play("success");

        this.storage.get("IdPartida").then(idPartida=>{
          if(idPartida){
            let jogada = {
              Acertou:1,
              Operacoes:`${this.number1}${this.operacao1}${this.number2}${this.operacao2}${this.number3}=${this.resultado}`,
              Time:this.timeDaVez,
              Tempo:this.ticks,
              IdPartida:idPartida
            }
            
            let alert = this.alertCtrl.create({
              title: "É ISSO AÍ!!",
              subTitle: "Continue assim e você vai se dar bem.",
              buttons: ["Ok"]
            });
            alert.present();
            console.log('ACERTOU');

            this.jogadaProv.salvar(jogada).subscribe(x=>{
              this.callback(this.resultado).then(() => { 
                this.navCtrl.pop();
              });
            })
          }else{
            
            let alert = this.alertCtrl.create({
              title: "É ISSO AÍ!!",
              subTitle: "Continue assim e você vai se dar bem.",
              buttons: ["Ok"]
            });
            alert.present();
            console.log('ACERTOU');

            this.callback(this.resultado).then(() => { 
              this.navCtrl.pop();
            });
          }
        })

        
       
      
      }else{
        this.nativeAudio.play("error");

        this.storage.get("IdPartida").then(idPartida=>{
          if(idPartida){
            let jogada = {
              Acertou:0,
              Operacoes:`${this.number1}${this.operacao1}${this.number2}${this.operacao2}${this.number3}=${this.resultado}`,
              Time:this.timeDaVez,
              Tempo:this.ticks,
              IdPartida:idPartida
            }
            
            let alert = this.alertCtrl.create({
              title: "Não foi dessa vez!",
              subTitle: "A operação que você realizou não estava correta. Fica ligado para não vacilar outra vez ;)",
              buttons: ["Ok"]
            });
            alert.present();
            console.log('ERROU');
            

            this.jogadaProv.salvar(jogada).subscribe(x=>{
              this.callback(-1).then(() => { 
                this.navCtrl.pop();
              });
            })
          }else{
            
            let alert = this.alertCtrl.create({
              title: "Não foi dessa vez!",
              subTitle: "A operação que você realizou não estava correta. Fica ligado para não vacilar outra vez ;)",
              buttons: ["Ok"]
            });
            alert.present();
            console.log('ERROU');

            this.callback(-1).then(() => { 
              this.navCtrl.pop();
            });
          }
        })

       
      }
    }

   
  }

  calcula(operando1,operacao,operando2){
    switch (operacao) {
      case '+':
        return operando1 + operando2;
      case '-':
        return operando1 - operando2;
      case '*':
        return operando1 * operando2;
      case '/':
        return operando1/operando2;
      default:
        break;
    }
  }

  time2marcou(numero){
    return this.time2Numeros.indexOf(numero) > -1;
  }

  time1marcou(numero){
    return this.time1Numeros.indexOf(numero) > -1;
  }

  pular(){
    this.subscription.unsubscribe();
    this.nativeAudio.stop("ticking");

    this.storage.get("IdPartida").then(idPartida=>{
      if(idPartida){
        let jogada = {
          Acertou:0,
          Operacoes:`${this.numero1}|${this.numero2}|${this.numero3}`,
          Time:this.timeDaVez,
          Tempo:this.ticks,
          IdPartida:idPartida
        }
        this.jogadaProv.salvar(jogada).subscribe(x=>{
          this.callback(-1).then(() => { 
            this.navCtrl.pop();
          });
        })
      }else{
        this.callback(-1).then(() => { 
          this.navCtrl.pop();
        });
      }
    })

  }

}
