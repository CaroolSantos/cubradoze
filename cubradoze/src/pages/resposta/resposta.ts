import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  timeDaVez:number;
  ticks =0;
  subscription:Subscription;
  resultado:number;
  number1:number;
  number2:number;
  number3:number;
  operacao1:string;
  operacao2:string;
  time1Numeros:number[] = [];
  time2Numeros:number[] = [];
  callback: any;
  array1: number[] = [];
  array2: number[] = [];
  array3: number[] = [];
  loader;
  enablebtn:boolean = true;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public nativeAudio: NativeAudio, public alertCtrl: AlertController,
    public conexaoProv: ConexaoProvider,
    public jogadaProv: JogadaProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController) {
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

      if (this.myCount == 0) {
        // this.array1.push(this.numero1);
        // this.array1.push(this.numero2);
        // this.array1.push(this.numero3);

        var array = [this.numero1,this.numero2,this.numero3];
        this.array1 = array.filter(this.onlyUnique);
        console.log(this.array1);

        // this.array2.push(this.numero1);
        // this.array2.push(this.numero2);
        // this.array2.push(this.numero3);

        // this.array3.push(this.numero1);
        // this.array3.push(this.numero2);
        // this.array3.push(this.numero3);

        clearInterval(interval);
      }
    }, 200)

    let timer = Observable.timer(2000,1000);
    this.subscription = timer.subscribe(t => this.tickerFunc(t));

    this.nativeAudio.loop("ticking");
  }

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }


  

  tickerFunc(tick){
    this.ticks = tick
    //console.log(this.ticks);
    if(this.ticks == 60){
      console.log('ACABOU O TEMPO');
      
      this.nativeAudio.stop("ticking");
      this.nativeAudio.play("error");
      this.subscription.unsubscribe();

      let alert = this.alertCtrl.create({
        title: "Tempo esgotado!",
        subTitle: "O tempo de resposta acabou :( tente na próxima vez.",
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

  arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

  conferir(){
    this.enablebtn = false;
    
    this.showLoading('Aguarde...');
    var selecionados = [this.number1,this.number2,this.number3];
    var sorteados = [this.numero1,this.numero2,this.numero3];

    var preenchimentocorreto = true;
    if(selecionados.indexOf(this.numero1) > -1){
      selecionados.splice(selecionados.indexOf(this.numero1),1);
      if(selecionados.indexOf(this.numero2) > -1){
        selecionados.splice(selecionados.indexOf(this.numero2),1);
        if(selecionados.indexOf(this.numero3) == -1){
          preenchimentocorreto = false;
        }
      }else{
        preenchimentocorreto = false;
      }
    }else{
      preenchimentocorreto = false;
    }

    if(!preenchimentocorreto){
      this.storage.get("IdPartida").then(idPartida=>{
        this.nativeAudio.play("error");
        if(idPartida){
          let jogada = {
            Acertou:0,
            Operacoes:`${this.number1}${this.operacao1}${this.number2}${this.operacao2}${this.number3}=${this.resultado}`,
            Time:this.timeDaVez,
            Tempo:this.ticks,
            IdPartida:idPartida
          }
          
          let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Vocês não preencheram os números da forma correta.",
            buttons: ["Ok"],
            enableBackdropDismiss: false
          });
          alert.present();
          console.log('ERROU');
          this.enablebtn = true;
          
          this.storage.get("jogo").then(jogo=>{
            this.loader.dismiss();
            if(jogo){
              var salvarjogada = jogo + ',' + JSON.stringify(jogada)
              this.storage.set("jogo",salvarjogada).then(()=>{
                
              });
            }else{
              var salvarjogada = JSON.stringify(jogada)
              this.storage.set("jogo",salvarjogada).then(()=>{
                  this.callback(this.resultado).then(() => { 
                    this.navCtrl.pop();
                  });
              });
            }
          })
          

          // this.jogadaProv.salvar(jogada).subscribe(x=>{
          //   this.loader.dismiss();
          //   // this.callback(-1).then(() => { 
          //   //   this.loader.dismiss();
          //   //   //this.navCtrl.pop();
          //   // });
          // })
        }else{
          this.loader.dismiss();
          let alert = this.alertCtrl.create({
            title: "Atenção!",
            subTitle: "Vocês não preencheram os números da forma correta.",
            buttons: ["Ok"],
            enableBackdropDismiss: false
          });
          alert.present();
          console.log('ERROU');

          // this.callback(-1).then(() => { 
          //   this.navCtrl.pop();
          // });
        }
      })
    }else{

    // console.log(this.resultado);
    
    // console.log(this.number1);
    // console.log(this.operacao1);
    // console.log(this.number2);
    // console.log(this.operacao2);
    // console.log(this.number3);

    

    if((this.operacao1== "+" || this.operacao1=="-") && (this.operacao2== "*" || this.operacao2=="/")){
      this.loader.dismiss();
      this.nativeAudio.play("error");
      //this.navCtrl.push(RespostaErradaPage);
      let alert = this.alertCtrl.create({
        title: "Se liga na ordem das operações!",
        cssClass: 'minha-classe', 
        subTitle: "Não é correto utilizar as operações de soma ou subtração ANTES das operações de multiplicação ou divisão.",
        buttons: ["Tentar novamente"],
        enableBackdropDismiss: false
      });
      alert.present();
      this.enablebtn = true;
    } else{

      var resultado1 = this.calcula(this.number1,this.operacao1,this.number2);
      var resultado2 = this.calcula(resultado1,this.operacao2,this.number3);
  
      
     
      if(resultado2 == this.resultado){
        console.log('time da vez',this.timeDaVez,this.time1Numeros,this.time2Numeros,this.resultado,this.time1Numeros.indexOf(resultado2),this.time2Numeros.indexOf(resultado2));
        //checar se número já não está preenchido
        if((this.timeDaVez == 1 && (this.time1Numeros.indexOf(resultado2) > -1)) || (this.timeDaVez == 2 && (this.time2Numeros.indexOf(resultado2) > -1))){
          
            this.loader.dismiss();
            let alert = this.alertCtrl.create({
              title: "Número já preenchido!",
              cssClass: 'minha-classe', 
              subTitle: "O número já está preenchido, tente fazer uma operação com um resultado diferente.",
              buttons: ["Tentar novamente"],
              enableBackdropDismiss: false
            });
            alert.present();
            this.enablebtn = true;
        }else{
          this.subscription.unsubscribe();
          this.nativeAudio.stop("ticking");
    
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
              this.loader.dismiss();
              
              let alert = this.alertCtrl.create({
                title: "É ISSO AÍ!",
                subTitle: "Continue assim e você vai se dar bem.",
                buttons: [{
                  text:"Ok",
                  handler: data => {
                    this.storage.get("jogo").then(jogo=>{
                      if(jogo){
                        console.log('jogo =  ' + JSON.stringify(jogo));
                        var salvarjogada = jogo + ',' + JSON.stringify(jogada)
                        this.storage.set("jogo",salvarjogada).then(()=>{
                            this.callback(this.resultado).then(() => { 
                              this.navCtrl.pop();
                            });
                        });
                      }else{
                        var salvarjogada = JSON.stringify(jogada)
                        this.storage.set("jogo",salvarjogada).then(()=>{
                            this.callback(this.resultado).then(() => { 
                              this.navCtrl.pop();
                            });
                        });
                      }
                    })
                    // this.jogadaProv.salvar(jogada).subscribe(x=>{
                    //   this.callback(this.resultado).then(() => { 
                    //     this.navCtrl.pop();
                    //   });
                    // })
                  }
                }],
                enableBackdropDismiss: false
              });
              alert.present();
              console.log('ACERTOU');
  
  
            }else{
              this.loader.dismiss();
              
              let alert = this.alertCtrl.create({
                title: "É ISSO AÍ!",
                subTitle: "Continue assim e você vai se dar bem.",
                buttons: [{
                  text: "Ok",
                  handler: data => {
                    this.callback(this.resultado).then(() => { 
                      this.navCtrl.pop();
                    });
                  }
                }],
              enableBackdropDismiss: false
              });
              alert.present();
              console.log('ACERTOU');
  
            }
          })
        }


        
       
      
      }else{
        this.loader.dismiss();
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
            //this.loader.dismiss();
            
            let alert = this.alertCtrl.create({
              title: "Não foi dessa vez!",
              subTitle: "A operação que você realizou não estava correta. Fica ligado para não vacilar outra vez ;). O resultado correto da expressão é " + resultado2,
              buttons: [{
                text: "Ok",
                handler: data => {
                  // this.jogadaProv.salvar(jogada).subscribe(x=>{
                  //   this.callback(-1).then(() => { 
                  //     this.navCtrl.pop();
                  //   });
                  // })
                  this.storage.get("jogo").then(jogo=>{
                    if(jogo){
                      var salvarjogada = jogo + ',' + JSON.stringify(jogada)
                      this.storage.set("jogo",salvarjogada).then(()=>{
                          this.callback(-1).then(() => { 
                            this.navCtrl.pop();
                          });
                      });
                    }else{
                      var salvarjogada = JSON.stringify(jogada)
                      this.storage.set("jogo",salvarjogada).then(()=>{
                          this.callback(-1).then(() => { 
                            this.navCtrl.pop();
                          });
                      });
                    }
                  })
                }
            }],
            enableBackdropDismiss: false
            });
            alert.present();
            console.log('ERROU');

          }else{
            //this.loader.dismiss();
            
            let alert = this.alertCtrl.create({
              title: "Não foi dessa vez!",
              subTitle: "A operação que você realizou não estava correta. Fica ligado para não vacilar outra vez ;)",
              buttons: [{
                text: "Ok",
                handler: data => {
                  this.callback(-1).then(() => { 
                    this.navCtrl.pop();
                  });
                }
              }],
              enableBackdropDismiss: false
            });
            alert.present();
            console.log('ERROU');
          }
        })

       
      }
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
        // this.jogadaProv.salvar(jogada).subscribe(x=>{
        //   this.callback(-1).then(() => { 
        //     this.navCtrl.pop();
        //   });
        // })
        this.storage.get("jogo").then(jogo=>{
          if(jogo){
            var salvarjogada = jogo + ',' + JSON.stringify(jogada)
            this.storage.set("jogo",salvarjogada).then(()=>{
                this.callback(-1).then(() => { 
                  this.navCtrl.pop();
                });
            });
          }else{
            var salvarjogada = JSON.stringify(jogada)
            this.storage.set("jogo",salvarjogada).then(()=>{
                this.callback(-1).then(() => { 
                  this.navCtrl.pop();
                });
            });
          }
        })
      }else{
        this.callback(-1).then(() => { 
          this.navCtrl.pop();
        });
      }
    })

  }

  showLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

}
