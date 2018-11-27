import { DefinicaoTimesPage } from './../pages/definicao-times/definicao-times';
import { IntroducaoPage } from './../pages/introducao/introducao';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PartidaProvider } from '../providers/partida/partida';
import { JogadaProvider } from '../providers/jogada/jogada';
import { HttpModule } from '@angular/http';
import { ConexaoProvider } from '../providers/conexao/conexao';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { RespostaPage } from '../pages/resposta/resposta';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroducaoPage,
    DefinicaoTimesPage,
    RespostaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroducaoPage,
    DefinicaoTimesPage,
    RespostaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PartidaProvider,
    JogadaProvider,
    ConexaoProvider,
    Network,
    NativeAudio
  ]
})
export class AppModule {}
