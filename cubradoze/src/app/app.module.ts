import { DefinicaoTimesPage } from './../pages/definicao-times/definicao-times';
import { IntroducaoPage } from './../pages/introducao/introducao';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
