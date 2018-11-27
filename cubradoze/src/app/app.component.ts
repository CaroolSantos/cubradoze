import { IntroducaoPage } from './../pages/introducao/introducao';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { NativeAudio } from '@ionic-native/native-audio';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroducaoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public nativeAudio: NativeAudio) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeAudio.preloadSimple('error', 'assets/sounds/error.wav').then(x=>{
        console.log('preload audio');
      }, error=>{
        console.error(error);
      });

       this.nativeAudio.preloadSimple('success', 'assets/sounds/success.wav').then(x=>{
        console.log('preload audio success');
      }, error=>{
        console.error(error);
      });

    });
  }
}

